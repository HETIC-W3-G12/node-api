const express = require('express')
const router = express.Router()

const usersController = require('../controllers/users')

/* GET users listing. */
router.get('/', usersController.index)

module.exports = router
