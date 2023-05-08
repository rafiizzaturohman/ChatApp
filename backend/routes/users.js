var express = require('express');
const User = require('../models/user');
const { Response, encodeToken, decodeToken } = require('../helpers/util');
var router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    const getUser = await User.find().populate('chats')

    res.status(200).json(new Response(getUser))
  } catch (error) {
    console.log(error)
    res.status(500).json(new Response(error, false))
  }
});

router.post('/', async (req, res, next) => {
  try {
    const createUser = await User.create(req.body)

    res.status(201).json(new Response(createUser))
  } catch (error) {
    console.log(error)
    res.status(500).json(new Response(error, false))
  }
});

router.delete('/:_id', async (req, res, next) => {
  try {
    const deleteUser = await User.findOneAndDelete({ _id: req.params._id })

    res.status(200).json(new Response(deleteUser))
  } catch (error) {
    console.log(error)
    res.status(500).json(new Response(error, false))
  }
});

router.post('/auth', async (req, res, next) => {
  try {
    const { username } = req.body
    const user = await User.findOne({ username })
    if (!user) return user = await User.create({ username: username })

    user.token = encodeToken({ userid: user._id, IGN: user.username })
    await user.save()
    res.status(201).json(new Response({ id: user._id, username: user.username, token: user.token, sender: user._id }))
  } catch (error) {
    console.log(error)
    res.status(500).json(new Response(error, false))
  }
});

router.get('/signout', async (req, res, next) => {
  try {
    const storageToken = req.get('Authorization')
    const token = storageToken?.split(' ')[1]
    if (!token) return res.status(401).json(new Response('Token not provided', false))
    const data = decodeToken(token)
    if (!data.userid) return res.status(401).json(new Response('User is not authorized', false))
    const user = await User.findById(data.userid)
    user.token = null
    await user.save()
    res.status(200).json(new Response('Yeah, You made it out!'))
  } catch (error) {
    console.log(error)
    res.status(500).json(new Response(error, false))
  }
})

module.exports = router;
