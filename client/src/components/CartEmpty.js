import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import { ColorButton } from '../utils/colorButton'
import { Link } from 'react-router-dom'
import { MENU_ROUTE } from '../utils/consts'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const CartEmpty = () => {
	return (
		<Card sx={{ margin: 3 }}>
			<CardContent sx={{ display: 'flex', flexFlow: 'column', justifyContent: 'center', alignItems: 'center', gap: 3 }}>
				<Typography sx={{ textAlign: 'center', fontSize: 24, fontWeight: 700 }}>
					Your cart is empty! Do a order.
				</Typography>
				<Link to={MENU_ROUTE}>
					<ColorButton sx={{ borderRadius: 4 }} size='xl' startIcon={<ArrowBackIcon />}>
						Back
					</ColorButton>
				</Link>
			
			</CardContent>
		</Card>
	)
}

export default CartEmpty