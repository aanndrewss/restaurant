import React, { useEffect, useState } from 'react'
import { Box, Card, CardContent, CardMedia, styled, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { fetchDish } from '../http/dishApi'

const DishPage = () => {
	
	const [dish, setDish] = useState({ info: [] })
	const { id } = useParams()
	
	const StyledBox = styled(Box)({
		display: 'grid',
		gridTemplateColumns: 'repeat(2, 1fr)',
		gridTemplateRows: 'repeat(1, 1fr)',
		['@media (max-width: 860px)']: { // eslint-disable-line no-useless-computed-key
			gridTemplateColumns: 'repeat(1, 1fr)'
		}
	})
	
	useEffect(() => {
		async function getDish() {
			try {
				const data = await fetchDish(id)
				setDish(data)
			} catch (e) {
				alert('Error')
			}
		}
		
		getDish()
	}, [])
	
	return (
		<StyledBox sx={{ marginTop: 4 }}>
			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<Card sx={{ width: 400, height: 400 }}>
					<CardMedia
						component='img'
						height='400'
						image={process.env.REACT_APP_API_URL + dish.img}
						alt={dish.name}
					/>
				</Card>
			</Box>
			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<Card sx={{ width: 400, height: 'fit-content', marginTop: 5 }}>
					<CardContent>
						<Typography sx={{ fontWeight: 800, fontSize: 24, textAlign: 'center' }}>
							{dish.name}
						</Typography>
						<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
							<Typography sx={{ fontWeight: 600, fontSize: 18 }}>
								{dish.price}₽
							</Typography>
							<Typography color='text.secondary'>
								{dish.grams}G
							</Typography>
						</Box>
						<Box>
							{dish.info.map((info) =>
								<Typography key={info.id} sx={{ margin: 1 }}>
									{info.description}
								</Typography>
							)}
						</Box>
					</CardContent>
				</Card>
			</Box>
		</StyledBox>
	)
}

export default DishPage