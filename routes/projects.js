const express = require('express')
const router = express.Router()

const ProjectsController = require('../controllers/projects-controller')


/**
 * @api {get} /projects Get all the projects
 * @apiGroup Project
 * @apiVersion 1.0.0
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
 *          "createdAt":"2019-01-03T11:36:58.540Z",
 *          "updatedAt":"2019-01-03T11:36:58.540Z"
 *         }]
 * 
 */
router.get('/', ProjectsController.index)


/**
 * @api {get} /projects/:id Get on project
 * @apiGroup Project
 * @apiVersion 1.0.0
 * @apiParam {integer} id id of the project
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
 *          "createdAt":"2019-01-03T11:36:58.540Z",
 *          "updatedAt":"2019-01-03T11:36:58.540Z"
 *         }
 * 
 */

router.get('/:id', ProjectsController.getOneProject)

/*

/project/finance
id du projet et id de l'utilsateur
>> le passer en financé

/project/create
post
>> valid de Base


/project d'un user
>> depuis un id
*/

/**
 * @api {post} /project Create a new project
 * @apiGroup Project
 * @apiVersion 1.0.0
 */
router.post('/', ProjectsController.create)

module.exports = router
