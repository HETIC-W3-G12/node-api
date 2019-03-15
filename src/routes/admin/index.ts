import * as express from 'express'
import usersRouter from './users'

const router = express.Router()

router.use('/users', usersRouter) 
router.use('/projects', usersRouter) 

router.use((req, res) => {
    if(!req.user.admin){
        res.status(401).send(null)
    }
}) 

export default router