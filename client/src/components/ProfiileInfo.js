import React from 'react'
import { Avatar, Box, Card, CardActions, CardContent, IconButton, Skeleton, Tooltip, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'

const ProfileInfo = ({ name, phone, email, isLoading }) => {
	return (
		<Card sx={{ borderRadius: 4 }}>
			<Typography sx={{ textAlign: 'center', fontWeight: 600, marginTop: 2 }} variant='h5'>
				Your info
			</Typography>
			<CardContent sx={{ display: 'flex', flexFlow: 'column', justifyContent: 'center', alignItems: 'center' }}>
				<Box sx={{ display: 'flex', justifyContent: 'center', margin: 1 }}>
					<Avatar sx={{ width: 70, height: 70 }} />
				</Box>
				{
					isLoading ?
						<Skeleton width={100} height={20} /> :
						<Typography sx={{ fontWeight: 700 }}>
							{name}
						</Typography>
				}
				
				<Box sx={{ marginTop: 3, display: 'flex', gap: 1, flexFlow: 'column' }}>
					<Typography sx={{ fontSize: 14, color: 'text.secondary' }}>
						Email
					</Typography>
					{
						isLoading ?
							<Skeleton width={200} height={22} sx={{marginBottom: 1}} /> :
							<Typography sx={{ fontWeight: 600, marginBottom: 1 }}>
								{email}
							</Typography>
					}
					<Typography sx={{ fontSize: 14, color: 'text.secondary' }}>
						Phone number
					</Typography>
					{
						isLoading ?
							<Skeleton width={200} height={22} sx={{marginBottom: 1}}/> :
							<Typography sx={{ fontWeight: 600, marginBottom: 1 }}>
								{phone}
							</Typography>
					}
				</Box>
			</CardContent>
			<CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
				<Tooltip title='Edit'>
					<IconButton>
						<EditIcon />
					</IconButton>
				</Tooltip>
			</CardActions>
		</Card>
	)
}

export default ProfileInfo
