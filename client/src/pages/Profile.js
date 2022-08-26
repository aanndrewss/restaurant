import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'
import { fetchUser } from '../http/userApi'
import ProfileInfo from '../components/ProfiileInfo'
import Address from '../components/Address/Address'
import Order from '../components/Orders/Order'

const Profile = () => {
	
	const orders = []
	
	
	const [user, setUser] = useState({addresses: []})
	const [isLoading, setIsLoading] = useState(true)
	const {id} = useParams()
	
	useEffect(() => {
		async function getUser() {
			const data = await fetchUser(id)
			setUser(data)
			setIsLoading(false)
		}
		
		getUser()
	}, [])
	
	return (
		<Box sx={{display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 5, marginTop: 3}}>
			<ProfileInfo {...user} isLoading={isLoading}/>
			<Box sx={{display: 'flex', flexFlow: 'column', gap: 4}}>
				<Address addresses={user.addresses} id={id} />
				<Order orders={orders}/>
			</Box>
		</Box>
	);
};

export default Profile;