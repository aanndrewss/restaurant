const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Basket, Addresses, DishInfo } = require('../models/models')

const generateJwt = (id, email, role) => {
	return jwt.sign(
		{ id, email, role },
		process.env.SECRET_KEY,
		{ expiresIn: '24h' }
	)
}

class UserController {
	async registration(req, res, next) {
		const { email, password, role, name, phone } = req.body
		if (!email || !password) {
			return next(ApiError.badRequest('Incorrect email or password'))
		}
		const candidate = await User.findOne({ where: { email } })
		if (candidate) {
			return next(ApiError.badRequest('User already exists'))
		}
		const hashPassword = await bcrypt.hash(password, 5)
		const user = await User.create({ email, role, password: hashPassword, name, phone })
		const basket = await Basket.create({ userId: user.id })
		const token = generateJwt(user.id, user.email, user.role, user.name, user.phone)
		return res.json({ token })
	}
	
	async login(req, res, next) {
		const { email, password } = req.body
		const user = await User.findOne({ where: { email } })
		if (!user) {
			return next(ApiError.badRequest('User not found'))
		}
		let comparePassword = bcrypt.compareSync(password, user.password)
		if (!comparePassword) {
			return next(ApiError.internal('Password is wrong'))
		}
		const token = generateJwt(user.id, user.email, user.role, user.name, user.phone)
		return res.json({ token })
	}
	
	async check(req, res, next) {
		const token = generateJwt(req.user.id, req.user.email, req.user.role, req.user.name, req.user.phone)
		return res.json({ token })
	}
	
	async logout(req, res) {
	
	}
	
	async activate(req, res) {
	
	}
	
	async refresh(req, res) {
	
	}
	
	async getUser(req, res) {
		const { id } = req.params
		const user = await User.findOne(
			{
				where: { id },
				include: [{ model: Addresses, as: 'addresses' }]
			}
		)
		return res.json(user)
	}
	
	async addAddress(req, res) {
		const { id } = req.params
		let { city, street, home } = req.body
		const address = Addresses.create({ city, street, home, userId: id })
		return res.json(address)
	}
	
	async deleteAddress(req, res) {
		const { id } = req.params
		await Addresses.destroy({
			where: {
				id: id
			}
		})
	}
	
	async editAddress(req, res) {
		const { id } = req.params
		let { city, street, home } = req.body
		await Addresses.update(
			{
				city: city,
				street: street,
				home: home
			},
			{
				where: {
					userId: id
				}
			}
		)
	}
	
	async editProfile(req, res) {
		const { id } = req.params
	}
	
}

module.exports = new UserController()