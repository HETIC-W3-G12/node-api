import User from '../entities/user'
import { validate } from 'class-validator'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import * as passport from 'passport'

export default class {
  async index(req, res) {
    const users = await User.find({
      relations: ['projects']
    })
    res.json(users)
  }

  async create(req, res) {
    const user = new User()
    user.email = req.body.email
    user.password = req.body.password

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
}
