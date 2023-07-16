const jwt = require('jsonwebtoken');
const User = require('../models/user')

class Response {
    constructor(data, success = true) {
        this.data = data
        this.success = success
    }
}

const tokenKey = 'RubiCAMP'

const encodeToken = (data) => jwt.sign(data, tokenKey, { expiresIn: '24h' })

const decodeToken = (token) => jwt.verify(token, tokenKey)

const isLoggedIn = async (req, res, next) => {
    try {
        const storageToken = req.get('Authorization')
        const token = storageToken?.split(' ')[1]

        if (!token) return res.status(401).json(new Response('Token not provided', false))

        const data = decodeToken(token)

        if (!data.userid) return res.status(401).json(new Response('User is not authorized', false))

        const user = await User.findById(data.userid)

        if (user.token !== token) return res.status(401).json(new Response('User not found', false))

        req.user = user

        next()
    } catch (error) {
        console.log(error);
        res.status(500).json(new Response(error, false))
    }
}

module.exports = {
    Response,
    encodeToken,
    decodeToken,
    isLoggedIn
}