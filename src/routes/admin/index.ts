import * as express from 'express'
import usersRouter from './users'
import projectsRouter from './projects'
import offersRouter from './offers'

const router = express.Router()

router.use('/users', usersRouter) 
router.use('/projects', projectsRouter) 
router.use('/offers', offersRouter) 

router.use((req, res) => {
    if(!req.user.admin){
        res.status(401).send(null)
    }
}) 

export default router