import React from 'react'
import { Box, CardContent, IconButton, Typography } from '@mui/material'
import { ColorButton } from '../utils/colorButton'
import CartItem from '../components/CartItem'
import DeleteIcon from '@mui/icons-material/Delete'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import PaymentIcon from '@mui/icons-material/Payment'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Link } from 'react-router-dom'
import { MENU_ROUTE } from '../utils/consts'
import { useDispatch, useSelector } from 'react-redux'
import { clearItems } from '../store/cartSlice'
import CartEmpty from '../components/CartEmpty'

const Cart = () => {
	
	
	const dispatch = useDispatch()
	const onClickClear = () => {
		if (window.confirm('Очистить корзину?')) {
			dispatch(clearItems())
		}
	}
	
	
	const { items, totalPrice } = useSelector(state => state.cartReducer)
	const totalCount = items.reduce((sum, item) => sum + item.count, 0)
	
	if (!totalPrice) {
		return <CartEmpty />
	}
	
	return (
		<Box sx={{ margin: 2 }}>
			<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<ShoppingCartIcon />
					<Typography
						variant='h3'
						sx={{ fontWeight: 700, fontSize: 20, color: 'black' }}
					>
						Cart
					</Typography>
				</Box>
				
				<IconButton onClick={onClickClear}>
					<DeleteIcon />
				</IconButton>
			</Box>
			<CardContent>
				{items.map((item) => (
					<CartItem key={item.id} {...item} />
				))}
			</CardContent>
			<Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
				<Typography>
					Positions: <b>{totalCount}</b>
				</Typography>
				<Typography>
					Total price: <b>{totalPrice}₽</b>
				</Typography>
			</Box>
			<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Link to={MENU_ROUTE}>
					<ColorButton startIcon={<ArrowBackIcon />}>
						Back
					</ColorButton>
				</Link>
				<ColorButton endIcon={<PaymentIcon />}>
					Order
				</ColorButton>
			</Box>
		
		</Box>
	)
}

export default Cart