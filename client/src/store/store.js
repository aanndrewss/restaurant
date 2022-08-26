import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import dishReducer from './dishSlice'
import cartReducer from './cartSlice'

const rootReducer = combineReducers({
	userReducer,
	dishReducer,
	cartReducer
})

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer
	})
}