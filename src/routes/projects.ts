const express = require('express')
const router = express.Router()
import { privateRoute } from '../passport'

import ProjectsController from '../controllers/projects-controller'

/**
 * @api {get} /projects  Get Valid only
 * @apiVersion 1.0.0
 * @apiName Projects
 * @apiDescription Get all the valid projects
 * @apiGroup Project
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [{
 *      "id": "b0e5e002-0be8-46be-a2ea-20fbf5426116",
 *      "title": "un vélo",
 *      "description": "svp c'est urgent",
 *      "price": 200,
 *      "interests": 0.01,
 *      "state": "valid",
 *      "timeLaps": 3,
 *      "createdDate": "2019-04-26T07:16:14.010Z",
 *      "signature_owner_photo_key": null
 *  }]
 *
 */
router.get('/', new ProjectsController().index)


/**
 * @api {get} /projects/:id Get Details
 * @apiVersion 1.0.0
 * @apiName Project
 * @apiDescription Get details on a project
 * @apiGroup Project
 *
 * @apiParam {integer} id Mandatory Id of the project
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "id": "b0e5e002-0be8-46be-a2ea-20fbf5426116",
 *        "title": "un vélo",
 *        "description": "svp c'est urgent",
 *        "price": 200,
 *        "interests": 0.01,
 *        "state": "valid",
 *        "timeLaps": 3,
 *        "createdDate": "2019-04-26T07:16:14.010Z",
 *        "signature_owner_photo_key": null
 *     }
 *
 */

router.get('/:id', new ProjectsController().getOneProject)


/**
 * @api {post} /projects Create project
 * @apiVersion 1.0.0
 * @apiName CreateProject
 * @apiDescription Create a new project. By default, project state is set to "valid". Will be change to "unvalid" and requiere manuel admin validation. When a investor make an offer, the project state turn to "waiting" -- mean an action from ower. He can accept the offer, turn the project to "running" (refounding) or refuse, project will turn back to valid for now. When the last refound is made, the project state will be set to "complete". For now, no need to send interests rate, will be set to 0.01 by default.
 * @apiGroup Project
 *
 * @apiParam {String} title     Mandatory Project's title.
 * @apiParam {String} description     Mandatory Project's description. 
 * @apiParam {Integer} price     Mandatory Amount wanted by the borrower.
 * @apiParam {Integer} timeLaps     Mandatory Number of month choose for the refund process duration.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "id": "b0e5e002-0be8-46be-a2ea-20fbf5426116",
 *        "title": "un vélo",
 *        "description": "svp c'est urgent",
 *        "price": 200,
 *        "interests": 0.01,
 *        "state": "valid",
 *        "timeLaps": 3,
 *        "createdDate": "2019-04-26T07:16:14.010Z",
 *        "signature_owner_photo_key": null
 *     }
 */
router.post('/', privateRoute, new ProjectsController().create)

export default router
