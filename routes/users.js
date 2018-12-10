const express = require('express')
const router = express.Router()

const UsersController = require('../controllers/users-controller')

/* GET users listing. */
router.get('/', UsersController.index)
router.post('/', UsersController.create)

module.exports = router
