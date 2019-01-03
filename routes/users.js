const express = require('express')
const router = express.Router()

const UsersController = require('../controllers/users-controller')

router.get('/', UsersController.index)
router.post('/', UsersController.create)

module.exports = router
