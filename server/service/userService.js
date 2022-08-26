const {User} = require('../models/models')
const bcrypt = require("bcrypt");
const uuid = require('uuid')
const MailService = require('./mailService')
const TokenService = require('./tokenService')
const UserDto = require('../dtos/userDto')

class UserService {

    async registration(email, password, role) {
        const candidate = await User.findOne({where: email})
        if (candidate) {
            throw new Error (`User with this email ${email} already exists`)
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const activationLink = uuid.v4()
        const user = await User.create({email, role, password: hashPassword, activationLink})
        await MailService.sendActivationMail(email, activationLink)
        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({...userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

}

module.exports = new UserService()