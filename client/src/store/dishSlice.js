import { createSlice } from '@reduxjs/toolkit'

let initialState = {
	types: [],
	dishes: [],
	searchValue: '',
	selectedType: {},
	totalCount: 0,
	page: 1,
	limit: 8,
	error: '',
	isLoading: false
}

export const dishSlice = createSlice({
	name: 'dish',
	initialState,
	reducers: {
		dishesFetching(state) {
			state.isLoading = true
		},
		setDishes(state, action) {
			state.isLoading = false
			state.dishes = action.payload
			state.error = ''
		},
		setIsLoading(state, action) {
			state.isLoading = action.payload
		},
		setTypes(state, action) {
			state.isLoading = false
			state.types = action.payload
			state.error = ''
		},
		setDish(state, action) {
			state.isLoading = false
			state.dish = action.payload
			state.error = ''
		},
		setType(state, action) {
			state.selectedType = action.payload
		},
		setTotalCount(state, action) {
			state.totalCount = action.payload
		},
		setPage(state, action) {
			state.page = action.payload
		},
		setLimit(state, action) {
			state.limit = action.payload
		},
		setError(state, action) {
			state.isLoading = false
			state.error = action.payload
		},
		setSearchValue(state, action){
			state.searchValue = action.payload
		}
	}
})

export const { setSearchValue } = dishSlice.actions

export default dishSlice.reducer