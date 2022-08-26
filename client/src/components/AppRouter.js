import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Menu from '../pages/Menu'
import { useSelector } from 'react-redux'
import Preloader from './Preloader'
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  DISH_ROUTE,
  LOGIN_ROUTE,
  MENU_ROUTE,
  PROFILE_ROUTE,
  REGISTRATION_ROUTE
} from '../utils/consts'
import Admin from '../pages/Admin'
import Cart from '../pages/Cart'
import Auth from '../pages/Auth'
import Profile from '../pages/Profile'

const DishPage = React.lazy(() => import('../pages/DishPage'))

const AppRouter = () => {
	const { isAuth } = useSelector(state => state.userReducer)
	return (
		<Routes>
			{isAuth &&
				<Route path={ADMIN_ROUTE} element={
					<Suspense fallback={<Preloader />}>
						<Admin />
					</Suspense>
				} />}
			
			{isAuth &&
				<Route path={BASKET_ROUTE} element={
					<Suspense fallback={<Preloader />}>
						<Cart />
					</Suspense>
				} />}
			
			{isAuth &&
				<Route path={PROFILE_ROUTE + '/:id'} element={
					<Suspense fallback={<Preloader />}>
						<Profile />
					</Suspense>
				} />}
			
			<Route path={MENU_ROUTE} element={
				<Suspense fallback={<Preloader />}>
					<Menu />
				</Suspense>
			} />
			<Route path={LOGIN_ROUTE} element={
				<Suspense fallback={<Preloader />}>
					<Auth />
				</Suspense>
			} />
			<Route path={REGISTRATION_ROUTE} element={
				<Suspense fallback={<Preloader />}>
					<Auth />
				</Suspense>
			} />
			<Route path={DISH_ROUTE + '/:id'} element={
				<Suspense fallback={<Preloader />}>
					<DishPage />
				</Suspense>
			} />
			<Route path='*' element={<Menu />} />
		</Routes>
	)
}

export default AppRouter