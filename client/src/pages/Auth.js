import React from 'react'
import { Box, Button, Card, TextField, Typography } from '@mui/material'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LOGIN_ROUTE, MENU_ROUTE, REGISTRATION_ROUTE } from '../utils/consts'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { setLogin, setRegistration } from '../store/actionCreators'

const Auth = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const isLogin = location.pathname === LOGIN_ROUTE
	
	const onSubmit = (formData) => {
		try {
			if (isLogin) {
				dispatch(setLogin(formData.email, formData.password))
			} else {
				dispatch(setRegistration(formData.email, formData.password, formData.name, formData.phone))
			}
			navigate(MENU_ROUTE)
		} catch (e) {
			alert(e.response.data.message)
		}
	}
	
	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm({
		mode: 'onBlur'
	})
	
	return (
		<Box sx={{ height: window.innerHeight - 54, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
			<Card sx={{ width: '400px', padding: 2, borderRadius: 2 }}>
				<Typography variant='h4' sx={{ textAlign: 'center', fontWeight: 600, marginBottom: 2 }}>
					{isLogin ? 'Sign in' : 'Create account'}
				</Typography>
				<form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexFlow: 'column' }}>
					{!isLogin && <TextField
						{...register('name', {
							required: 'Field is required!'
						})}
						placeholder='Name'
						label='Name'
						sx={{ marginBottom: 3, fontWeight: 700 }}
						error={errors?.name}
						helperText={errors?.name?.message}
					/>}
					{!isLogin && <TextField
						{...register('phone', {
							required: 'Field is required!',
							pattern: /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/
						})}
						placeholder='Phone'
						label='Phone'
						sx={{ marginBottom: 3, fontWeight: 700 }}
						error={errors?.phone}
						helperText={errors?.phone?.message || errors.phone?.type === 'pattern' && 'Phone is incorrect!'}
					/>}
					<TextField
						{...register('email', {
							required: 'Field is required!',
							pattern: /^\S+@\S+\.\S+$/
						})}
						placeholder='Email'
						label='Email'
						sx={{ marginBottom: 3, fontWeight: 700 }}
						error={errors?.email}
						helperText={errors?.email?.message || errors.email?.type === 'pattern' && 'Email is incorrect!'}
					/>
					<TextField
						{...register('password', {
							required: 'Field is required!'
						})}
						placeholder='Password'
						type='password'
						label='Password'
						error={errors?.password}
						helperText={errors?.password?.message}
						sx={{ marginBottom: 1 }}
					/>
					<Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr', alignItems: 'center' }}>
						{isLogin ?
							<Typography>
								Have not account? <Link to={REGISTRATION_ROUTE}>Create</Link>
							</Typography>
							:
							<Typography>
								Have account? <Link to={LOGIN_ROUTE}>Sign in</Link>
							</Typography>
						}
						<Button type='submit' variant='contained' sx={{ margin: 2 }}>
							{isLogin ? 'Sign in' : 'Create'}
						</Button>
					</Box>
				</form>
			</Card>
		</Box>
	)
}

export default Auth