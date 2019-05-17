import Project, { State as StateEnum } from '../../entities/project' 
import * as express from 'express'

const router = express.Router()

/**
 * @api {get} /admin/projects Get all the project and user associed
 * @apiGroup Admin Project
 * @apiVersion 1.0.0
 * 
 * @apiPermission admin
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
 * @api {get} /admin/projects/valid/:id Validation of the project
 * @apiGroup Admin Project
 * @apiVersion 1.0.0
 * 
 * @apiParam {integer} id Mandatory Id of the project
 * 
 * @apiPermission admin
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
 * @api {get} /admin/projects/delete/:id Delete the project
 * @apiGroup Admin Project
 * @apiVersion 1.0.0
 * 
 * @apiParam {integer} id Mandatory Id of the project
 * 
 * @apiPermission admin
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