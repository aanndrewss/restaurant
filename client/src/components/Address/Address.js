import React, { useState } from 'react'
import { Box, Card, IconButton, Tooltip, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import AddressItem from './AddressItem'
import CreateAddress from '../modals/CreateAddress'

const Address = ({ addresses, id }) => {
	
	const [open, setOpen] = useState(false)
	
	return (
		<>
			<Card sx={{ borderRadius: 4, backgroundColor: '#037A4E' }}>
				<Box
					sx={{ display: 'flex', flexFlow: 'row', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
					<Typography sx={{ textAlign: 'center', fontWeight: 600, color: 'white', marginTop: 2 }}
					            variant='h5'>
						Your addresses
					</Typography>
					<Tooltip title='Add address'>
						<IconButton sx={{ marginTop: 2 }} onClick={() => setOpen(true)}>
							<AddIcon sx={{ color: 'white' }} />
						</IconButton>
					</Tooltip>
				</Box>
				{ addresses.length === 0 ? <Typography>You dont have addresses. Add!</Typography> :
					addresses.map((address) => <AddressItem key={address.id} {...address} />)
				}
			</Card>
			<CreateAddress open={open} onClose={() => setOpen(false)} id={id} />
		</>
	)
}

export default Address
