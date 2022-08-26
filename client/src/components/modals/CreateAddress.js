import React from 'react'
import { Box, Button, Modal, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { addUserAddress } from '../../http/userApi'

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4
}

const CreateAddress = ({open, onClose, id}) => {
	
	const {
		register,
		handleSubmit
	} = useForm({
		mode: 'onBlur'
	})
	
	const onSubmit = (formData) => {
		addUserAddress(id, formData.city, formData.street, formData.home).then(data => {
			onClose()
			window.location.reload()
		})
	}
	
	return (
		<Modal open={open} onClose={onClose}>
			<Box sx={style}>
				<form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexFlow: 'column', gap: 5 }}>
					<TextField
						{...register('city', {})}
						placeholder='City'
						variant='standard'
						label='City'
					/>
					<TextField
						{...register('street', {})}
						placeholder='Street'
						variant='standard'
						label='Street'
					/>
					<TextField
						{...register('home', {})}
						placeholder='Home'
						variant='standard'
						label='Home'
					/>
					<Button type='submit' variant='contained'>
						CREATE
					</Button>
				</form>
			</Box>
		</Modal>
	)
}

export default CreateAddress
