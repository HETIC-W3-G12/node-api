const express = require('express')
const router = express.Router()

const usersController = require('../controllers/users')
const User = require('../models/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.findAll().then(users => {
    res.send(users)
  })
})

module.exports = router
