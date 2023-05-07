const jwt = require('jsonwebtoken');
const User = require('../models/user')

class Response {
    constructor(data, success = true) {
        this.data = data
        this.success = success
    }
}

const tokenKey = 'RubiCAMP'

const encodeToken = (data) => jwt.sign(data, tokenKey, { expiresIn: '1h' })

const decodeToken = (data) => jwt.verify(data, tokenKey)

const isLoggedIn = async (req, res, next) => {
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json(new Response(error, false))
    }
}

module.exports = {
    Response,
    encodeToken,
    decodeToken
}