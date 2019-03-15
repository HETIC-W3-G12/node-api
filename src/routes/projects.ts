const express = require('express')
const router = express.Router()
import { privateRoute } from '../passport'

import ProjectsController from '../controllers/projects-controller'

/**
 * @api {get} /projects  Get all the valid projects
 * @apiVersion 1.0.0
 * @apiName Projects
 * @apiDescription Get all the valid projects
 * @apiGroup Project
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [{
 *          "id": "afded117-dcc0-4a56-ada1-e2ff8663ea1e",
 *          "title":"Un vélo pour Sam",
 *          "price":200,
 *          "timeLaps":3,
 *          "description":"Résolution 2019 ! Aller à mon travail en vélo, mais j'ai pas de vélo...",
 *          "interests": 0.015,
 *          "state":"valid",
 *          "createdAt":"2019-01-03T11:36:58.540Z"
 *      }]
 *
 */
router.get('/', new ProjectsController().index)


/**
 * @api {get} /projects/:id Get details on a project
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
 *          "id": "afded117-dcc0-4a56-ada1-e2ff8663ea1e",
 *          "title":"Un vélo pour Sam",
 *          "price":200,
 *          "timeLaps":3,
 *          "description":"Résolution 2019 ! Aller à mon travail en vélo, mais j'ai pas de vélo...",
 *          "interests": 0.015,
 *          "state":"valid",
 *          "createdAt":"2019-01-03T11:36:58.540Z"
 *      }
 *
 */

router.get('/:id', new ProjectsController().getOneProject)


/**
 * @api {post} /projects Create a new project
 * @apiVersion 1.0.0
 * @apiName CreateProject
 * @apiDescription Create a new project
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
 *          "id": "afded117-dcc0-4a56-ada1-e2ff8663ea1e",
 *          "title":"Un vélo pour Sam",
 *          "price":200,
 *          "timeLaps":3,
 *          "description":"Résolution 2019 ! Aller à mon travail en vélo, mais j'ai pas de vélo...",
 *          "interests":0.015,
 *          "state":"valid",
 *          "createdAt":"2019-01-03T11:36:58.540Z"
 *      }
 */
router.post('/', privateRoute, new ProjectsController().create)

export default router
