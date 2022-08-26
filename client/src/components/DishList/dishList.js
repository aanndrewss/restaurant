import React from 'react'
import { Grid, Skeleton } from '@mui/material'
import { useSelector } from 'react-redux'
import DishItem from './dishItem'

const DishList = () => {
	const { dishes, isLoading } = useSelector(state => state.dishReducer)
	
	const items = dishes.map((dish) => <DishItem key={dish.id} {...dish} />)
	const skeletons = Array.from(new Array(8)).map((_, index) => (
		<Grid item xs={12} sm={6} md={4} lg={3} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
			<Skeleton width={270} height={303} sx={{ borderRadius: 3 }} variant='rectangular' key={index} />
		</Grid>
	))
	
	
	return (
		<Grid container spacing={3} direction='row'>
			{isLoading ? skeletons : items}
		</Grid>
	)
}

export default DishList