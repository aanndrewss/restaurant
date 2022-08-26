import React, { useEffect, useState } from 'react'
import { IconButton, InputAdornment, styled, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { setSearchValue } from '../store/dishSlice'
import debounce from 'lodash.debounce'
import { useDispatch } from 'react-redux'
import ClearIcon from '@mui/icons-material/Clear'

const SearchBar = () => {
	
	const [value, setValue] = useState('')
	const dispatch = useDispatch()
	const inputRef = React.useRef(null)
	
	const onClickClear = () => {
		dispatch(setSearchValue(''))
		setValue('')
		inputRef.current?.focus()
	}
	
	const updateSearchValue = React.useCallback(
		debounce((str) => {
			dispatch(setSearchValue(str))
		}, 150),
		[]
	)
	
	const onChangeInput = (event) => {
		setValue(event.target.value)
		updateSearchValue(event.target.value)
	}
	
	
	
	
	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<form style={{
				display: 'grid',
				gridTemplateColumns: '4fr 0.1fr',
				alignItems: 'center',
				marginTop: 20,
				width: 400,
				flexFlow: 'row'
			}}>
				<TextField
					ref={inputRef}
					value={value}
					onChange={onChangeInput}
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<SearchIcon />
							</InputAdornment>
						)
					}}
					size='small'
					placeholder='Search for dish'
					variant='standard'
				/>
				{value && <IconButton onClick={onClickClear}>
					<ClearIcon sx={{width: 13, height: 13}}/>
				</IconButton>}
			</form>
		</div>
	)
}

export default SearchBar