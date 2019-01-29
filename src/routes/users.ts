const express = require('express')
const router = express.Router()

import UsersController from '../controllers/users-controller'

/**
 * @api {get} /users Get all the user
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @apiPermission admin
 */
router.get('/', new UsersController().index)

/**
 * @api {post} /users/sign_up Create a new user
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @apiParam {String} email user unique email.
 * @apiParam {String} password user password.
 */
router.post('/sign_up', new UsersController().create)

/**
 * @api {post} /users/sign_in Login
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @apiParam {String} email user unique email.
 * @apiParam {String} password user password.
 */
router.post('/sign_in', new UsersController().signIn)

export default router
