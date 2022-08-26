const uuid = require('uuid')
const path = require('path')
const { Dish, DishInfo } = require('../models/models')
const ApiError = require('../error/ApiError')
const { Op } = require('sequelize')

class DishController {
	async create(req, res, next) {
		try {
			let { name, price, grams, typeId, info } = req.body
			const { img } = req.files
			let fileName = uuid.v4() + '.jpg'
			img.mv(path.resolve(__dirname, '..', 'static', fileName))
			
			const dish = await Dish.create({ name, price, grams, typeId, img: fileName })
			
			if (info) {
				info = JSON.parse(info)
				info.forEach(i =>
					DishInfo.create({
						title: i.title,
						description: i.description,
						dishId: dish.id
					})
				)
			}
			return res.json(dish)
		} catch (e) {
			next(ApiError.badRequest(e.message))
		}
		
	}
	
	async getAll(req, res) {
		let { typeId, limit, page, name1 } = req.query
		page = page || 1
		limit = limit || 9
		let offset = page * limit - limit
		let dishes
		if (!typeId && !name1) {
			dishes = await Dish.findAndCountAll({ limit, offset })
		} else if (!typeId) {
			dishes = await Dish.findAndCountAll({where: {
				name: {
					[Op.iLike]: '%' + name1 + '%'}},
				limit, offset})
		} else if (!name1) {
			dishes = await Dish.findAndCountAll({where: {typeId}, limit, offset})
		} else {
			dishes = await Dish.findAndCountAll({ where: { typeId,
				name: {
					[Op.iLike]: '%' + name1 + '%'}},
				limit, offset })
		}
		return res.json(dishes)
	}
	
	async getOne(req, res) {
		const { id } = req.params
		const dish = await Dish.findOne(
			{
				where: { id },
				include: [{ model: DishInfo, as: 'info' }]
			}
		)
		return res.json(dish)
	}
}

module.exports = new DishController()