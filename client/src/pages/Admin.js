import React, { useState } from 'react'
import { Button } from '@mui/material'
import CreateType from '../components/modals/createType'
import CreateDish from '../components/modals/createDish'

const Admin = () => {
	const [typeVisible, setTypeVisible] = useState(false)
	const [dishVisible, setDishVisible] = useState(false)
	return (
		<>
			<Button
				variant='contained'
				onClick={() => setTypeVisible(true)}
				sx={{ margin: 2 }}
			>
				ADD TYPE
			</Button>
			<Button
				variant='contained'
				onClick={() => setDishVisible(true)}
				sx={{ margin: 2 }}
			>
				ADD DISH
			</Button>
			<CreateType open={typeVisible} onClose={() => setTypeVisible(false)} />
			<CreateDish open={dishVisible} onClose={() => setDishVisible(false)} />
		</>
	)
}

export default Admin