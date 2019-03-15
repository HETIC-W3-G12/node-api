import User from '../entities/user'
import Project from '../entities/project'

import { validate } from 'class-validator'
import { pick, forEach } from 'lodash'

import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import * as passport from 'passport'

export default class {

  /**
   * CREATE a new user
   */ 
  async create(req, res) {

    const params = pick(req.body, [
      'firstname', 'lastname', 'adress', 'city', 'postCode', 'birthplace', 
      'email', 'password'
    ])

    const user = new User()

    user.birthdate = new Date(req.body.birthdate)

    forEach(params, (value, key) => {
      user[key] = value
    })

    const errors = await validate(user)
    if (errors.length > 0) {
      res.status(400).json(errors)
    } else {
      user.password = await bcrypt.hash(req.body.password, 10)
      user.save().then(user => {
        res.json(user)
      }).catch(err => {
        res.status(500).json(err)
      })
    }
  }

  /**
   * CONNECT the user and retrieve the token
   */ 
  signIn(req, res) {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.status(401).json({
          info
        })
      }
      req.login(user, { session: false }, err => {
        if (err) {
          res.send(err)
        }
        // generate a signed son web token with the contents of user object and return it in the response
        const token = jwt.sign(user, process.env.JWT_SECRET)
        return res.json({ info, user, token })
      })
    })(req, res)
  }

  /**
   * GET user's projects
   */ 
  async projects(req, res) {
    try{
      const users = await User.createQueryBuilder('user')
                              .leftJoinAndSelect('user.projects', 'project')
                              .getMany()
      res.json(users)
    } catch(err) {
      res.status(500).json(err)
    }
  }
}
