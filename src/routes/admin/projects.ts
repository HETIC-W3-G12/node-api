import Project, { State as StateEnum } from '../../entities/project' 
import * as express from 'express'

const router = express.Router()

/**
 * @api {get} /admin/projects Get all the project.
 * @apiGroup Admin Project
 * @apiVersion 1.0.0
 * 
 * @apiPermission admin
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [{
 *         "id": "c1049eb7-95e6-4179-8a17-2982961180f5",
 *         "title": " un mac",
 *         "description": "bouuuuuh j'ai pas de tune",
 *         "price": 600,
 *         "interests": 0.1,
 *         "state": "valid",
 *         "timeLaps": 5,
 *         "createdDate": "2019-05-16T14:19:02.918Z",
 *         "signature_owner_photo_key": null
 *      },
 *      {
 *         "id": "95bb0f77-eeff-46d5-b6e8-84396e32fa68",
 *         "title": "un vélo",
 *         "description": "svp c'est urgent",
 *         "price": 200,
 *         "interests": 0.1,
 *         "state": "valid",
 *         "timeLaps": 3,
 *         "createdDate": "2019-05-17T07:43:17.274Z",
 *         "signature_owner_photo_key": null
 *     }]
 */
router.get('/', async (req, res) => {
  try{
    const projects = await Project.createQueryBuilder('project')
                          // .leftJoinAndSelect('project.user', 'user')
                          .getMany()
    res.json(projects)
  } catch(err) {
    res.status(500).json(err)
  }
})

/**
 * @api {get} /admin/projects/valid/:id Validate a project.
 * @apiGroup Admin Project
 * @apiVersion 1.0.0
 * 
 * @apiDescription The just created project's state are : unvalid. Need an admin validation to turn to valid to be display in the app.
 * 
 * @apiParam {integer} id Mandatory Id of the project
 * 
 * @apiPermission admin
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     "Le projet a été validé."
 */
router.get('/valid/:id', async (req, res) => {
  
  const project = Project.findOne({
    where: { id: req.params.id }
  })
  .then(project => {

    project.state = StateEnum.VALID

    project.save().then(project => {
      res.status(200).json("Le projet a été validé.")
    }).catch(err => {
      res.status(500).json(err)
    })
  })
  .catch(err => {
    res.status(404).json(err)
  })
})

/**
 * @api {get} /admin/projects/delete/:id Delete a project
 * @apiGroup Admin Project
 * @apiVersion 1.0.0
 * 
 * @apiParam {integer} id Mandatory Id of the project
 * 
 * @apiPermission admin
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     "Le projet a été supprimé."
 */
router.get('/delete/:id', async (req, res) => {
  
  try{
    await Project.createQueryBuilder()
                  .delete()
                  .from(Project)
                  .where("id = :id", { id: req.params.id })
                  .execute();
    res.status(200).json("Le projet a été supprimé.")
  } catch(err) {
    res.status(500).json(err)
  }
})

export default router