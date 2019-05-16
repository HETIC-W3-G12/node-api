import User from '../entities/user'
import Project from '../entities/project'
import Offer from '../entities/offer'

import { validate } from 'class-validator'
import { pick, forEach } from 'lodash'

import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import * as passport from 'passport'

import { getFile, uploadFile } from '../file_upload'

export default class {

  /**
   * CREATE a new user
   */ 
  async create(req, res) {

    const params = pick(req.body, [
      'email', 'password', 'firstname', 'lastname', 'adress', 'city', 'postCode', 
      'birthdate', 'birthplace'
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
        const { password,...withoutPassword } = user
        const token = jwt.sign(withoutPassword, process.env.JWT_SECRET, (err, token) => {
          console.log(err)
          res.json({
            info: {
              message: 'Account created'
            },
            token,
            user: pick(user, [
            'firstname', 'lastname', 'adress', 'city', 'postCode', 'birthplace', 'email'
            ])
          })
        })
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
   * GET user's dashboard
   */ 
  async dashboard(req, res) {
    try{
      const project = await Project.createQueryBuilder('project')
                              .where("project.user = :id", { id: req.user.id })
                              .getOne()
      
      const offers = await Offer.createQueryBuilder('offer')
                                .where("offer.user = :id", { id: req.user.id })
                                .leftJoinAndSelect('offer.project', 'project')
                                .getMany()
      
      const response = {
        "project": project,
        "offers": offers
      }
      
      res.json(response)
    } catch(err) {
      res.status(500).json(err)
    }
  }

  async updateIdentity(req, res) {
    try {
      const user = await User.findOne(req.user.id)
      const file = await uploadFile(req.body.file, 'identity')

      user.identity_key = file.Key
      user.save().then(resp => {
        res.json({ message: 'Idendity file saved' })
      })
    } catch (err) {
      res.status(500).json(err)
    }
  }

  async getIdentity(req, res) {
    try {
      const user = await User.findOne(req.user.id)
      getFile(user.identity_key).then(resp => {
        res.json(resp)
      })
    } catch (err) {
      res.status(500).json(err)
    }
  }

  async updateFacePhoto(req, res) {
    try {
      const user = await User.findOne(req.user.id)
      const file = await uploadFile(req.body.file, 'face_photo')

      user.face_photo_key = file.Key
      user.save().then(resp => {
        res.json({ message: 'Face photo file saved' })
      })
    } catch (err) {
      res.status(500).json(err)
    }
  }

  async getFacePhoto(req, res) {
    try {
      const user = await User.findOne(req.user.id)
      getFile(user.face_photo_key).then(resp => {
        res.json(resp)
      })
    } catch (err) {
      res.status(500).json(err)
    }
  }
}
