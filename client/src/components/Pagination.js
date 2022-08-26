import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination, Stack } from '@mui/material'
import { dishSlice } from '../store/dishSlice'

const Paginator = () => {
	
	const dispatch = useDispatch()
	const { totalCount, limit, page } = useSelector(state => state.dishReducer)
	const pageCount = Math.ceil(totalCount / limit)
	const pages = []
	
	const handleChange = (event, value) => {
		dispatch(dishSlice.actions.setPage(value))
	}
	
	for (let i = 0; i < pageCount; i++) {
		pages.push(i + 1)
	}
	
	return (
		<Stack spacing={2}>
			<Pagination count={pages.length} page={page} onChange={handleChange}
			            sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }} />
		</Stack>
	)
}

export default Paginator