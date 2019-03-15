import User from '../../entities/user' 
import * as express from 'express'

const router = express.Router()

/**
 * @api {get} /admin/users Get all the user
 * @apiGroup Admin Users
 * @apiVersion 1.0.0
 * @apiPermission admin
 */
router.get('/', async (req, res) => {
    const users = await User.createQueryBuilder('user')
                            .leftJoinAndSelect('user.projects', 'project')
                            .getMany()
    res.json(users)
})

/**
 * @api {get} /admin/users/count Count the number of user
 * @apiGroup Admin Users
 * @apiVersion 1.0.0
 * @apiPermission admin
 */
router.get('/count', async (req, res) => {
  const users = await User.count()
  res.json(users)
})

export default router
