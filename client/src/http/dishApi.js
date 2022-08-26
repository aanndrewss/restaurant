import { $authHost, $host } from './index'

export const postType = async (type) => {
	const { data } = await $authHost.post('api/type', type)
	return data
}

export const fetchTypes = async () => {
	const { data } = await $host.get('api/type')
	return data
}

export const postDish = async (dish) => {
	const { data } = await $authHost.post('api/dish', dish)
	return data
}

export const fetchDishes = async (typeId, page, limit, searchValue) => {
	const { data } = await $host.get('api/dish', {
		params: {
			typeId, page, limit, name1: searchValue
		}
	})
	return data
}

export const fetchDish = async (id) => {
	const { data } = await $host.get('api/dish/' + id)
	return data
}
