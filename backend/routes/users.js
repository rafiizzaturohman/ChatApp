var express = require('express');
const User = require('../models/user');
const { Response } = require('../helpers/util');
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
    const deleteUser = await User.findOneAndDelete({_id: req.params._id})
    res.status(200).json(new Response())
  } catch (error) {
    
  }
})

module.exports = router;
