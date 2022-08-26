import React, { useState } from 'react'
import { Box, Card, IconButton, Tooltip, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { deleteUserAddress } from '../../http/userApi'
import CreateAddress from '../modals/CreateAddress'
import { useParams } from 'react-router-dom'


const AddressItem = ({ id, street, home, city }) => {
	
	const [open, setOpen] = useState(false)
	const {userId} = useParams()
	
	const deleteAddress = () => {
		if (window.confirm('Do you want delete address?')) {
			deleteUserAddress(id)
		}
	}
	
	return (
		<>
			<Card sx={{
				display: 'flex',
				flexFlow: 'row',
				margin: 2,
				height: 50,
				alignItems: 'center',
				justifyContent: 'space-between'
			}}>
				<Tooltip title='Edit'>
					<IconButton onClick={() => setOpen(true)}>
						<EditIcon />
					</IconButton>
				</Tooltip>
				<Box sx={{ display: 'flex', flexFlow: 'row', gap: 2 }}>
					<Typography>
						City: <b>{city}</b>
					</Typography>
					<Typography>
						Street: <b>{street}</b>
					</Typography>
					<Typography>
						Home: <b>{home}</b>
					</Typography>
				</Box>
				<Box>
					<Tooltip title='Delete'>
						<IconButton>
							<DeleteIcon onClick={deleteAddress} />
						</IconButton>
					</Tooltip>
				</Box>
			</Card>
			<CreateAddress open={open} onClose={() => setOpen(false)} id={userId} />
		</>
	)
}

export default AddressItem