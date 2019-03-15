import Project from '../../entities/project' 
import * as express from 'express'

const router = express.Router()

/**
 * @api {get} /admin/projects Get all the project and user associed
 * @apiGroup Admin Project
 * @apiVersion 1.0.0
 * @apiPermission admin
 */
router.get('/', async (req, res) => {
    const projects = await Project.createQueryBuilder('project')
      .leftJoinAndSelect('project.user', 'user')
      .getMany()
    res.json(projects)
})

export default router