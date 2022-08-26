import React from 'react'
import { Box, Button, Modal, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { postType } from '../../http/dishApi'

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

const CreateType = ({ open, onClose }) => {
	
	const {
		register,
		handleSubmit
	} = useForm({
		mode: 'onBlur'
	})
	
	const onSubmit = (formData) => {
		postType({ name: formData.type }).then(data => {
			onClose()
		})
	}
	
	return (
		<Modal
			open={open}
			onClose={onClose}
		>
			<Box sx={style}>
				<form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexFlow: 'column', gap: 5 }}>
					<TextField
						{...register('type', {})}
						placeholder='Type'
						variant='standard'
						label='Type'
					/>
					<Button type='submit' variant='contained'>
						CREATE
					</Button>
				</form>
			</Box>
		</Modal>
	)
}

export default CreateType