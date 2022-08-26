import { $authHost, $host } from './index'
import jwt_decode from 'jwt-decode'

export const registration = async (email, password, name, phone) => {
	const { data } = await $host.post('api/user/registration', { email, password, role: 'ADMIN', name, phone })
	localStorage.setItem('token', data.token)
	return jwt_decode(data.token)
}

export const login = async (email, password) => {
	const { data } = await $host.post('api/user/login', { email, password })
	localStorage.setItem('token', data.token)
	return jwt_decode(data.token)
}

export const check = async () => {
	const { data } = await $authHost.get('api/user/auth')
	localStorage.setItem('token', data.token)
	return jwt_decode(data.token)
}

export const fetchUser = async (id) => {
	const { data } = await $authHost.get('api/user/' + id)
	return data
}

export const addUserAddress = async (id, city, street, home) => {
	const {data} = await $authHost.post('api/user/' + id, {city, street, home})
	return data
}

export const deleteUserAddress = async (id) => {
	const {data} = await $authHost.delete('api/user/' + id)
	return data
}

export const editProfile = async (id) => {

}