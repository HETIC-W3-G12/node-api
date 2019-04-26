const express = require('express')
const router = express.Router()
import { privateRoute } from '../passport'

import UsersController from '../controllers/users-controller'

/**
 * @api {post} /users/sign_up Create user
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @apiParam {String} email Mandatory user unique email
 * @apiParam {String} password{6..72} Mandatory user password
 * @apiParam {String} firstname Mandatory user firstname
 * @apiParam {String} lastname Mandatory user lastname
 * @apiParam {Date} birthdate Mandatory user birthdate date format YYYY-mm-dd
 * @apiParam {String} birthplace Mandatory user birthplace
 * @apiParam {String} adress Mandatory user adress
 * @apiParam {String} city Mandatory user city
 * @apiParam {Interger} postCode Mandatory user poste code
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
 * @api {GET} /users/dashboard Dashboard
 * @apiDescription Retrieve all the user's projects and offers using his token.
 * @apiGroup Users
 * @apiVersion 1.0.0
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "id": "068f84b1-a282-4ac4-8af6-8312e401f46e",
 *        "email": "saaaaaa@gmail.com",
 *        "firstname": "saaaaam",
 *        "lastname": "chery",
 *        "birthdate": "1992-06-12T00:00:00.000Z",
 *        "birthplace": "blois",
 *        "adress": "9 pierre dupond",
 *        "city": "paris",
 *        "postCode": 75010,
 *        "identity_key": null,
 *        "face_photo_key": null,
 *        "admin": false,
 *        "createdDate": "2019-04-26T07:12:59.365Z",
 *        "projects": [
 *           {
 *               "id": "b0e5e002-0be8-46be-a2ea-20fbf5426116",
 *               "title": "un vélo",
 *               "description": "svp c'est urgent",
 *               "price": 200,
 *               "interests": 0.01,
 *               "state": "running",
 *               "timeLaps": 3,
 *               "createdDate": "2019-04-26T07:16:14.010Z",
 *               "signature_owner_photo_key": null
 *           }
 *       ],
 *       "offers": [{
 *           "id": "49f59cab-7c0b-4951-8399-00996307771b",
 *           "state": "accepted",
 *           "createdDate": "2019-04-26T07:21:02.527Z",
 *           "signature_investor_photo_key": null
 *           "project": {
 *               "id": "b0e5e002-0be8-46be-a2ea-20fbf5426116",
 *               "title": "un vélo",
 *               "description": "svp c'est urgent",
 *               "price": 200,
 *               "interests": 0.01,
 *               "state": "waiting",
 *               "timeLaps": 3,
 *               "createdDate": "2019-04-26T07:16:14.010Z",
 *               "signature_owner_photo_key": null
 *           }
 *       }]
 *    }
 */
router.get('/dashboard', privateRoute, new UsersController().dashboard)

/**
 * @api {post} /users/identity Upload user's identity file
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @apiParam {String} file base64 file
 */
router.post('/identity', privateRoute, new UsersController().updateIdentity)

/**
 * @api {GET} /users/identity User's identity file
 * @apiGroup Users
 * @apiVersion 1.0.0
 */
router.get('/identity', privateRoute, new UsersController().getIdentity)

/**
 * @api {post} /users/face_photo Upload user's face photo file
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @apiParam {String} file base64 file
 */
router.post('/face_photo', privateRoute, new UsersController().updateFacePhoto)

/**
 * @api {GET} /users/face_photo User's face photo file
 * @apiGroup Users
 * @apiVersion 1.0.0
 */
router.get('/face_photo', privateRoute, new UsersController().getFacePhoto)

export default router
