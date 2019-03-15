const express = require('express')
const router = express.Router()
import { privateRoute } from '../passport'

import UsersController from '../controllers/users-controller'

/**
 * @api {post} /users/sign_up Create a new user
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @apiParam {String} email Mandatory user unique email
 * @apiParam {String} password{6..72} Mandatory user password
 * @apiParam {String} firstname Mandatory user firstname
 * @apiParam {String} lastname Mandatory user lastname
 * @apiParam {Date} birthdate Mandatory user birthdate, Timestamp Unix
 * @apiParam {String} birthplace Mandatory user birthplace
 * @apiParam {String} adress Mandatory user adress
 * @apiParam {String} city Mandatory user city
 * @apiParam {Interger} posteCode Mandatory user poste code
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

/**
 * @api {GET} /users/projects User's projects
 * @apiGroup Users
 * @apiVersion 1.0.0
 */
router.get('/projects', privateRoute, new UsersController().projects)

export default router
