import { createSlice } from '@reduxjs/toolkit'

let initialState = {
	user: [],
	isAuth: false,
	isLoading: false,
	error: ''
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		fetchingUser(state) {
			state.isLoading = true
		},
		setUser(state, action) {
			state.user = action.payload
			state.isLoading = false
			state.error = ''
		},
		setIsAuth(state, action) {
			state.isAuth = action.payload
		},
		setError(state, action) {
			state.isLoading = false
			state.error = action.payload
		}
		
	}
})

export default userSlice.reducer