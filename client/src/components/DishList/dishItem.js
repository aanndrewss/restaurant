import React from 'react'
import { Link } from 'react-router-dom'
import { DISH_ROUTE } from '../../utils/consts'
import { Button, Card, CardActions, CardContent, CardMedia, Grid, styled, Typography } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useDispatch } from 'react-redux'
import { addItem } from '../../store/cartSlice'

const ColorButton = styled(Button)({
	color: 'black',
	backgroundColor: 'white',
	'&:hover': {
		backgroundColor: '#d3d3d3'
	}
})

const StyledCard = styled(Card)({
	transition: 'all 0.2s ease-in-out',
	'&:hover': {
		transform: 'scale(1.03)'
	}
})

const DishItem = ({ id, name, price, grams, img }) => {
	
	const dispatch = useDispatch()
	
	const onClickAdd = () => {
		const item = {
			id, name, price, grams, img, count: 0
		}
		dispatch(addItem(item))
	}
	
	return (
		<Grid item xs={12} sm={6} md={4} lg={3} key={id} sx={{ display: 'flex', justifyContent: 'center' }}>
			<StyledCard sx={{ width: '270px' }}>
				<Link to={DISH_ROUTE + `/${id}`} style={{ textDecoration: 'none' }}>
					<CardMedia
						component='img'
						height='194'
						image={process.env.REACT_APP_API_URL + img}
						alt={name}
						sx={{ objectFit: 'cover', width: '100%', backgroundSize: 'cover' }}
					/>
				</Link>
				<CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<Typography sx={{ height: 30, fontWeight: 800 }}>
						{name}
					</Typography>
					<Typography sx={{ fontWeight: 700 }}>
						{price}₽
					</Typography>
				</CardContent>
				<CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<Typography sx={{ color: 'text.secondary' }}>
						{grams}g
					</Typography>
					<ColorButton onClick={onClickAdd} sx={{ borderRadius: 3 }} size='small' startIcon={<ShoppingCartIcon />}>
						<Typography sx={{fontSize: 14}}>
							Add
						</Typography>
					</ColorButton>
				</CardActions>
			</StyledCard>
		</Grid>
	)
}

export default DishItem