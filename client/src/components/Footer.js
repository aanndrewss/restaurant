import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import FacebookIcon from '@mui/icons-material/Facebook'
import logo from '../assets/logo.png'

const Footer = () => {
	return (
		<Grid container sx={{
			backgroundColor: 'black',
			marginTop: 3, height: '200px',
			justifyContent: 'space-between',
			alignItems: 'center'
		}}>
			<Grid item xs={12} sm={6} md={6} lg={4} sx={{ display: 'flex' ,justifyContent: 'center' }}>
				<Box sx={{ display: 'flex', flexFlow: 'row', alignItems: 'center' }}>
					<img alt='logo' style={{ width: '77px', height: '77px', marginLeft: 30 }} src={logo} />
					<Box sx={{ width: '220px', textAlign: 'center', margin: 2 }}>
						<Typography sx={{ color: 'white', fontSize: 12 }}>
							<b>Meat Bar Beefy</b> - это уникальный мясной бар, где вы сможете хорошо провести своё время
							с друзьями
							и
							насладиться самыми вусными блюдами и напитками.
						</Typography>
					</Box>
				</Box>
			</Grid>
			
			<Grid item xs={12} sm={6} md={4} lg={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
				<Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, justifyContent: 'center' }}>
					<InstagramIcon sx={{ color: 'white', cursor: 'pointer' }} />
					<TwitterIcon sx={{ color: 'white', cursor: 'pointer' }} />
					<FacebookIcon sx={{ color: 'white', cursor: 'pointer' }} />
				</Box>
				<Typography sx={{ color: 'white', fontSize: 12, textAlign: 'center'}}>
					© made by ANDRXW66
				</Typography>
			</Grid>
		
		</Grid>
	)
}

export default Footer