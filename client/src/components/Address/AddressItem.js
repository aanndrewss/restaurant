import React, { useState } from 'react'
import { Box, Card, FormControl, IconButton, TextField, Tooltip, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { deleteUserAddress, editUserAddresses } from '../../http/userApi'
import CreateAddress from '../modals/CreateAddress'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'


const AddressItem = ({ id, street, home, city }) => {
	
	const [open, setOpen] = useState(false)
	const [editMode, setEditMode] = useState(false)
	const [town, setTown] = useState(city)
	const [street1, setStreet] = useState(street)
	const [home1, setHome] = useState(home)
	const { userId } = useParams()
	
	const deleteAddress = () => {
		if (window.confirm('Do you want delete address?')) {
			deleteUserAddress(id).then(data => {
				window.location.reload()
			})
		}
	}
	
	const onSubmit = () => {
		const formData = new FormData()
		formData.append('city', town)
		formData.append('street', street1)
		formData.append('home', home1)
		editUserAddresses(userId, formData.city, formData.street, formData.home).then(data => {
			window.location.reload()
		})
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
					<IconButton onDoubleClick={() => setEditMode(false)} onClick={() => setEditMode(true)}>
						<EditIcon />
					</IconButton>
				</Tooltip>
				<FormControl onBlur={onSubmit} sx={{ display: 'flex', flexFlow: 'row', gap: 2 }}>
						<Typography sx={{ display: 'flex', alignItems: 'center' }}>
							City: {editMode ? <TextField value={town} onChange={e => setTown(e.target.value)} size='small' sx={{ width: 100 }} /> : <b>{city}</b>}
						</Typography>
						<Typography sx={{ display: 'flex', alignItems: 'center' }}>
							Street: {editMode ? <TextField value={street1} onChange={e => setStreet(e.target.value)} size='small' sx={{ width: 100 }} /> : <b>{street}</b>}
						</Typography>
						<Typography sx={{ display: 'flex', alignItems: 'center' }}>
							Home: {editMode ? <TextField value={home1} onChange={e => setHome(e.target.value)} size='small' sx={{ width: 100 }} /> : <b>{home}</b>}
						</Typography>
				</FormControl>
				<Box>
					<Tooltip title='Delete'>
						<IconButton onClick={deleteAddress}>
							<DeleteIcon />
						</IconButton>
					</Tooltip>
				</Box>
			</Card>
			<CreateAddress open={open} onClose={() => setOpen(false)} id={userId} />
		</>
	)
}

export default AddressItem