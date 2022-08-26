const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	email: { type: DataTypes.STRING, unique: true },
	password: { type: DataTypes.STRING },
	role: { type: DataTypes.STRING, defaultValue: 'USER' },
	phone: { type: DataTypes.STRING },
	name: { type: DataTypes.STRING }
})

const Basket = sequelize.define('basket', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

const BasketDish = sequelize.define('basket_dish', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

const Dish = sequelize.define('dish', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, unique: true, allowNull: false },
	price: { type: DataTypes.INTEGER, allowNull: false },
	grams: { type: DataTypes.INTEGER, allowNull: false },
	img: { type: DataTypes.STRING, allowNull: false }
})

const Type = sequelize.define('type', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, unique: true, allowNull: false }
})

const DishInfo = sequelize.define('dish_info', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	title: { type: DataTypes.STRING, allowNull: false },
	description: { type: DataTypes.STRING, allowNull: false }
})

const Addresses = sequelize.define('addresses', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	city: {type: DataTypes.STRING},
	street: {type: DataTypes.STRING},
	home: {type: DataTypes.STRING}
})

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Addresses, {as: 'addresses'})
Addresses.belongsTo(User)

Basket.hasMany(BasketDish)
BasketDish.belongsTo(Basket)

Type.hasMany(Dish)
Dish.belongsTo(Type)

Dish.hasMany(BasketDish)
BasketDish.belongsTo(Dish)

Dish.hasMany(DishInfo, { as: 'info' })
DishInfo.belongsTo(Dish)

module.exports = {
	User,
	Basket,
	BasketDish,
	Dish,
	Type,
	DishInfo,
	Addresses
}


