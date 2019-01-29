const express = require('express')
const router = express.Router()
const passport = require('passport')

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
 *          "id":1,
 *          "title":"Un vélo pour Sam",
 *          "user_uid":3,
 *          "price":200,
 *          "timeLaps":3,
 *          "description":"Résolution 2019 ! Aller à mon travail en vélo, mais j'ai pas de vélo...",
 *          "interests":"0%",
 *          "state":"valid",
 *          "createdAt":"2019-01-03T11:36:58.540Z"
 *         }]
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
 * @apiParam {integer} id id of the project
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "id":1,
 *          "title":"Un vélo pour Sam",
 *          "user_uid":3,
 *          "price":200,
 *          "timeLaps":3,
 *          "description":"Résolution 2019 ! Aller à mon travail en vélo, mais j'ai pas de vélo...",
 *          "interests":"0%",
 *          "state":"valid",
 *          "createdAt":"2019-01-03T11:36:58.540Z"
 *         }
 *
 */

router.get('/:id', new ProjectsController().getOneProject)

/**
 * Get the project of a user
 */
router.get('/user/:id', new ProjectsController().getProjectByUser)

/**
 * @api {post} /projects/funded Project has been founded
 * @apiVersion 1.0.0
 * @apiName FoundedProject
 * @apiDescription Link a project to an investor and update the status
 * @apiGroup Project
 *
 *
 * @apiParam {Integer} projectId     Mandatory Id of the project.
 * @apiParam {Integer} investorId     Mandatory Id of the investor.
 */
router.get('/funded', new ProjectsController().projectFounded)


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
 * @apiParam {Float} interests     Mandatory The interests decided for the refund.
 * @apiParam {String="valid","unvalid"} state     Mandatory Project's description.
 * @apiParam {Integer} timeLaps     Mandatory Number of month choose for the refund process duration.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "id":1,
 *          "title":"Un vélo pour Sam",
 *          "user_uid":3,
 *          "price":200,
 *          "timeLaps":3,
 *          "description":"Résolution 2019 ! Aller à mon travail en vélo, mais j'ai pas de vélo...",
 *          "interests":"0%",
 *          "state":"valid",
 *          "createdAt":"2019-01-03T11:36:58.540Z"
 *         }
 */
router.post('/', passport.authenticate('jwt', {session: false}), new ProjectsController().create)

export default router
