import React from 'react'
import { Button, Divider, Stack, styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedType } from '../store/actionCreators'

const TypeBar = () => {
	const { types, selectedType } = useSelector(state => state.dishReducer)
	const dispatch = useDispatch()
	const ColorButton = styled(Button)({
		color: 'black',
		backgroundColor: '#d3d3d3',
		'&:hover': {
			backgroundColor: 'gray'
		}
	})
	const isEmpty = !Object.keys(selectedType).length
	return (
		<Stack
			direction='row'
			divider={<Divider orientation='vertical' flexItem />}
			spacing={2}
			sx={{ marginTop: 3, marginBottom: 3, display: 'flex', justifyContent: 'center' }}
		>
			<ColorButton
				onClick={() => dispatch(setSelectedType({}))}
				variant={isEmpty ? 'contained' : ''}
				sx={{ border: isEmpty ? '2px solid #025838' : '' }}
			>
				All
			</ColorButton>
			{types.map(type =>
				<ColorButton
					key={type.id}
					onClick={() => dispatch(setSelectedType(type))}
					variant={type.id === selectedType.id ? 'contained' : ''}
					sx={{ border: type.id === selectedType.id ? '2px solid #025838' : '' }}
				>
					{type.name}
				</ColorButton>
			)}
		</Stack>
	)
}

export default TypeBar