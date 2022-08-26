import { Button, styled } from '@mui/material'

export const ColorButton = styled(Button)({
	color: 'black',
	backgroundColor: '#d3d3d3',
	'&:hover': {
		backgroundColor: 'gray'
	}
})

export const CartButton = styled(Button)({
	color: 'black',
	backgroundColor: 'white',
	borderRadius: 9,
	'&:hover': {
		backgroundColor: '#E6FEF6'
	}
})