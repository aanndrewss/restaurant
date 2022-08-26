import React, { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar'
import { Container } from '@mui/material'
import Footer from './components/Footer'
import { useDispatch } from 'react-redux'
import Preloader from './components/Preloader'
import './index.css'
import { check } from './http/userApi'
import { userSlice } from './store/userSlice'


const App = () => {
	
	const [loading, setLoading] = useState(true)
	const dispatch = useDispatch()
	
	useEffect(() => {
		check().then(data => {
			dispatch(userSlice.actions.setIsAuth(true))
			dispatch(userSlice.actions.setUser(data))
		}).finally(() => setLoading(false))
	}, [])
	
	if (loading) {
		return <Preloader />
	}
	
	return (
		<BrowserRouter>
			<NavBar />
			<Container>
				<AppRouter />
			</Container>
			<Footer />
		</BrowserRouter>
	)
}

export default App