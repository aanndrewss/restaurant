import React, { useState } from 'react'
import { AppBar, Avatar, Box, Button, Menu, MenuItem, styled, Toolbar, Typography } from '@mui/material'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import { Link } from 'react-router-dom'
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, MENU_ROUTE, PROFILE_ROUTE } from '../utils/consts'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/actionCreators'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { CartButton } from '../utils/colorButton'


const StyledToolBar = styled(Toolbar)({
	display: 'flex',
	justifyContent: 'space-between',
	backgroundColor: '#025838'
})

const NavBar = () => {
	
	const dispatch = useDispatch()
	
	const [anchorEl, setAnchorEl] = useState(null)
	const open = Boolean(anchorEl)
	
	const handleClick = (e) => {
		setAnchorEl(e.currentTarget)
	}
	
	const handleClose = () => {
		setAnchorEl(null)
	}
	
	const handleLogout = () => {
		dispatch(logout())
		handleClose()
	}
	
	const { isAuth, user } = useSelector(state => state.userReducer)
	const { items, totalPrice } = useSelector(state => state.cartReducer)
	const ColorButton = styled(Button)({
		color: 'black',
		backgroundColor: 'white',
		'&:hover': {
			backgroundColor: '#d3d3d3'
		}
	})
	
	const totalCount = items.reduce((sum, item) => sum + item.count, 0)
	
	return (
		<AppBar position='sticky' sx={{ borderRadius: 3 }}>
			<StyledToolBar>
				<Link to={MENU_ROUTE} style={{ color: 'white', textDecoration: 'none' }}>
					<Box
						display='flex'
						flexDirection='row'
						alignItems='center'
					>
						<RestaurantIcon sx={{ marginRight: 2 }} />
						<Typography
							variant='h6'
							sx={{
								fontFamily: 'monospace',
								fontWeight: 700,
								letterSpacing: '.4rem',
								color: 'inherit',
								textDecoration: 'none',
								display: { xs: 'none', sm: 'flex' }
							}}
						>
							BEEFY
						</Typography>
					</Box>
				</Link>
				{isAuth
					? <>
						<Box display='flex' flexDirection='row' alignItems='center' gap={3}>
							<Link to={BASKET_ROUTE} style={{ color: 'black', textDecoration: 'none' }}>
								<CartButton>
									{totalPrice} ₽
									<span style={{ marginRight: 3, marginLeft: 3 }}>|</span>
									<ShoppingCartIcon fontSize='small' />
									{totalCount}
								</CartButton>
							</Link>
							<Avatar
								sx={{ cursor: 'pointer' }}
								onClick={handleClick}
								id='positioned-button'
								aria-controls={open ? 'positioned-menu' : undefined}
								aria-haspopup='true'
								aria-expanded={open ? 'true' : undefined}
							/>
						</Box>
					</>
					: <Link to={LOGIN_ROUTE} style={{ color: 'black', textDecoration: 'none' }}>
						<ColorButton>
							SIGN IN
						</ColorButton>
					</Link>
				}
			</StyledToolBar>
			<Menu
				id='positioned-menu'
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				sx={{ marginTop: 6, marginLeft: 1 }}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'left'
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left'
				}}
			>
				<Link style={{ textDecoration: 'none', color: 'black' }} to={PROFILE_ROUTE + `/${user?.id}`}>
					<MenuItem onClick={handleClose}>
						Profile
					</MenuItem>
				</Link>
				<Link style={{ textDecoration: 'none', color: 'black' }} to={ADMIN_ROUTE}>
					<MenuItem onClick={handleClose}>
						Admin
					</MenuItem>
				</Link>
				<MenuItem onClick={handleLogout}>
					Logout
				</MenuItem>
			</Menu>
		</AppBar>
	)
}

export default NavBar