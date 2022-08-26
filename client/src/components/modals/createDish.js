import React, { useEffect, useState } from 'react'
import { Box, Button, FormControl, MenuItem, Modal, Select, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getTypes, setSelectedType } from '../../store/actionCreators'
import { postDish } from '../../http/dishApi'

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

const CreateDish = ({ open, onClose }) => {
	const { types, selectedType } = useSelector(state => state.dishReducer)
	const dispatch = useDispatch()
	
	
	const [name, setName] = useState('')
	const [price, setPrice] = useState(0)
	const [grams, setGrams] = useState(0)
	const [file, setFile] = useState(null)
	const [info, setInfo] = useState([])
	
	const addInfo = () => {
		setInfo([...info, { title: '', description: '', number: Date.now() }])
	}
	const removeInfo = (number) => {
		setInfo(info.filter(i => i.number !== number))
	}
	const changeInfo = (key, value, number) => {
		setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i))
	}
	
	const onSubmit = () => {
		const formData = new FormData()
		formData.append('name', name)
		formData.append('price', `${price}`)
		formData.append('grams', `${grams}`)
		formData.append('img', file)
		formData.append('typeId', selectedType.id)
		formData.append('info', JSON.stringify(info))
		postDish(formData).then(data => onClose())
	}
	
	const selectFile = e => {
		setFile(e.target.files[0])
	}
	
	useEffect(() => {
		dispatch(getTypes())
	}, [])
	
	return (
		<Modal
			open={open}
			onClose={onClose}
		>
			<Box sx={style}>
				<FormControl sx={{ display: 'flex', flexFlow: 'column', gap: 5 }}>
					<Select
						label='Choose type'
					>
						{types.map(type =>
							<MenuItem
								onClick={() => dispatch(setSelectedType(type))}
								key={type.id}
								value={type.name}
							>
								{type.name}
							</MenuItem>
						)}
					</Select>
					<TextField
						placeholder='Name'
						value={name}
						onChange={e => setName(e.target.value)}
					/>
					<TextField
						placeholder='Grams'
						label='Grams'
						value={grams}
						onChange={e => setGrams(Number(e.target.value))}
					/>
					<TextField
						placeholder='Price'
						label='Price'
						value={price}
						onChange={e => setPrice(Number(e.target.value))}
					/>
					<TextField
						type='file'
						onChange={selectFile}
					/>
					<Button
						variant='contained'
						onClick={addInfo}
					>
						ADD NEW INFO
					</Button>
					{info.map(i =>
						<Box key={i.number} sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 3 }}>
							<TextField
								value={i.title}
								onChange={(e) => changeInfo('title', e.target.value, i.number)}
								placeholder='Add a title'
							/>
							<TextField
								value={i.description}
								onChange={(e) => changeInfo('description', e.target.value, i.number)}
								placeholder='Add a description'
							/>
							<Button onClick={() => removeInfo(i.number)} variant='contained'>
								DELETE
							</Button>
						</Box>
					)}
					<Button
						sx={{ margin: 2, display: 'flex' }}
						variant='contained'
						type='submit'
						onClick={onSubmit}
					>
						CREATE
					</Button>
				</FormControl>
			
			</Box>
		</Modal>
	)
}

export default CreateDish