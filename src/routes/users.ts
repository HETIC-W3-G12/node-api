const express = require('express')
const router = express.Router()

import UsersController from '../controllers/users-controller'

/**
 * @api {get} /users Get all the user
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @apiPermission admin
 */
router.get('/', new UsersController().index)

/**
 * @api {post} /users/sign_up Create a new user
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @apiParam {String} email user unique email.
 * @apiParam {String} password user password.
 */
router.post('/sign_up', new UsersController().create)

// LOGIN

const jwt = require('jsonwebtoken')
const passport = require('passport')
/**
 * @api {post} /users/sign_in Login
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @apiParam {String} email user unique email.
 * @apiParam {String} password user password.
 */
router.post('/sign_in', function(req, res, next) {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(401).json({
        message: 'Something is not right',
        user
      })
    }
    req.login(user, { session: false }, err => {
      if (err) {
        res.send(err)
      }
      // generate a signed son web token with the contents of user object and return it in the response
      const token = jwt.sign(user, process.env.JWT_SECRET)
      return res.json({ user, token })
    })
  })(req, res)
})

export default router