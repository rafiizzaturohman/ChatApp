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



module.exports = {
    Response,
    encodeToken,
    decodeToken
}