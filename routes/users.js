const express = require('express')
const router = express.Router()

const UsersController = require('../controllers/users-controller')

/**
 * @api {get} /users Get all the user
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiPermission admin
 */
router.get('/', UsersController.index)

/**
 * @api {post} /user Create a new user
 * @apiGroup User
 * @apiVersion 1.0.0
 */
router.post('/', UsersController.create)

module.exports = router
