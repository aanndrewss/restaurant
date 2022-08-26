import React from 'react'
import { Box, Card, Typography } from '@mui/material'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'
import { CartButton } from '../../utils/colorButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link } from 'react-router-dom'
import { MENU_ROUTE } from '../../utils/consts'
import OrderItem from './OrderItem'

const Order = ({orders}) => {
	return (
		<Card sx={{borderRadius: 4, backgroundColor: '#049962'}}>
			<Typography sx={{textAlign: 'center', fontWeight: 600, color: 'white', marginTop: 2}} variant='h5'>
				Your orders
			</Typography>
			{orders.length !== 0 ?
				orders.map((order) => <OrderItem key={order.id} {...order}/>)
				:
				<Box sx={{display: 'flex', flexFlow: 'column', justifyContent: 'center', alignItems: 'center'}}>
					<Typography sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						color: 'white',
						fontSize: 18,
						marginTop: 1
					}}>
						You don't have orders <SentimentVeryDissatisfiedIcon/>
					</Typography>
					<CartButton sx={{width: 'fit-content', margin: 1}} startIcon={<ArrowBackIcon/>}>
						<Link to={MENU_ROUTE} style={{textDecoration: 'none', color: 'black'}}>
							MENU
						</Link>
					</CartButton>
				</Box>
			}
		</Card>
	)
}

export default Order
