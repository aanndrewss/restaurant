import { login, registration } from '../http/userApi'
import { userSlice } from './userSlice'
import { fetchDishes, fetchTypes } from '../http/dishApi'
import { dishSlice } from './dishSlice'


export const setLogin = (email, password) => async (dispatch) => {
	try {
		const data = await login(email, password)
		dispatch(userSlice.actions.setUser(data))
		dispatch(userSlice.actions.setIsAuth(true))
	} catch (e) {
		dispatch(userSlice.actions.setError(e.message))
	}
}

export const setRegistration = (email, password, name, phone) => async (dispatch) => {
	try {
		const data = await registration(email, password, name, phone)
		dispatch(userSlice.actions.setUser(data))
		dispatch(userSlice.actions.setIsAuth(true))
	} catch (e) {
		dispatch(userSlice.actions.setError(e.message))
	}
}

export const logout = () => async (dispatch) => {
	try {
		localStorage.removeItem('token')
		dispatch(userSlice.actions.setIsAuth(false))
		dispatch(userSlice.actions.setUser({}))
	} catch (e) {
		dispatch(userSlice.actions.setError(e.message))
	}
}

export const getTypes = () => async (dispatch) => {
	try {
		dispatch(dishSlice.actions.dishesFetching())
		const data = await fetchTypes()
		dispatch(dishSlice.actions.setTypes(data))
	} catch (e) {
		dispatch(dishSlice.actions.setError(e.message))
	}
}

export const getDishes = (typeId, page, limit, searchValue) => async (dispatch) => {
	try {
		dispatch(dishSlice.actions.dishesFetching())
		const data = await fetchDishes(typeId, page, limit, searchValue)
		dispatch(dishSlice.actions.setDishes(data.rows))
		dispatch(dishSlice.actions.setTotalCount(data.count))
		dispatch(dishSlice.actions.setLimit(limit))
	} catch (e) {
		dispatch(dishSlice.actions.setError(e.message))
	}
}


export const setSelectedType = (type) => async (dispatch) => {
	try {
		dispatch(dishSlice.actions.setType(type))
		dispatch(dishSlice.actions.setPage(1))
	} catch (e) {
		dispatch(dishSlice.actions.setError(e.message))
	}
}
