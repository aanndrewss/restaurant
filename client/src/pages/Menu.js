import React, { useEffect } from 'react'
import TypeBar from '../components/TypeBar'
import DishList from '../components/DishList/dishList'
import { useDispatch, useSelector } from 'react-redux'
import { getDishes, getTypes } from '../store/actionCreators'
import Paginator from '../components/Pagination'
import SearchBar from '../components/SearchBar'

const Menu = () => {
	
	const dispatch = useDispatch()
	const { selectedType, page, limit, searchValue } = useSelector(state => state.dishReducer)
	
	useEffect(() => {
		dispatch(getTypes())
		dispatch(getDishes(selectedType.id, page, limit))
	}, [])
	
	useEffect(() => {
		dispatch(getDishes(selectedType.id, page, limit, searchValue))
		window.scrollTo(0, 0);
	}, [selectedType, page, searchValue])
	
	
	return (
		<>
			<SearchBar/>
			<TypeBar />
			<DishList />
			<Paginator />
		</>
	)
}

export default Menu