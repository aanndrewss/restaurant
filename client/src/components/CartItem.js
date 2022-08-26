import React from 'react'
import { Box, Card, IconButton, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import CloseIcon from '@mui/icons-material/Close'
import { addItem, minusItem, removeItem } from '../store/cartSlice'
import { useDispatch } from 'react-redux'

const CartItem = ({ id, name, price, count, img }) => {
	
	const dispatch = useDispatch()
	const onClickRemove = () => {
		if (window.confirm('Delete dish?')) {
			dispatch(removeItem(id))
		}
	}
	
	const onClickPlus = () => {
		dispatch(addItem({ id }))
	}
	const onClickMinus = () => {
		dispatch(minusItem(id))
	}
	return (
		<Card sx={{ display: 'flex', flexFlow: 'row', margin: 1, justifyContent: 'space-between', alignItems: 'center' }}>
			<Box sx={{ display: 'flex', flexFlow: 'row' }}>
				<img alt={name} src={process.env.REACT_APP_API_URL + img} style={{ width: 130, height: 110 }} />
				<Box sx={{ display: 'flex', flexFlow: 'column', marginLeft: 3 }}>
					<Typography sx={{ fontSize: 20, fontWeight: 700, marginTop: 0.8, textAlign: 'center' }}>
						{name}
					</Typography>
					<Box sx={{ display: 'flex', flexFlow: 'row', alignItems: 'center', gap: 1 }}>
						<IconButton disabled={count === 1} onClick={onClickMinus}>
							<RemoveIcon />
						</IconButton>
						<Typography sx={{ fontSize: 18 }}>{count}</Typography>
						<IconButton onClick={onClickPlus}>
							<AddIcon />
						</IconButton>
					</Box>
					<Typography sx={{ textAlign: 'center' }}>
						{price}₽
					</Typography>
				</Box>
			</Box>
			<IconButton onClick={onClickRemove} sx={{ width: 30, height: 30, marginRight: 3 }}>
				<CloseIcon />
			</IconButton>
		</Card>
	)
}

export default CartItem