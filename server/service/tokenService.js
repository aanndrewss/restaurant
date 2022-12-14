const jwt = require('jsonwebtoken')
const {Token} = require('../models/models')

class TokenService {

    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.SECRET_KEY1, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({user: userId})
        if(tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await Token.create({user: userId, refreshToken})
        return token
    }

}

module.exports = new TokenService()