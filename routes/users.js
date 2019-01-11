const express = require('express')
const router = express.Router()

const UsersController = require('../controllers/users-controller')

/**
 * @api {get} /users Get all the user
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiPermission admin
 */
router.get('/', UsersController.index)

/**
 * @api {post} /users/sign_up Create a new user
 * @apiGroup User
 * @apiVersion 1.0.0
 */
router.post('/sign_up', UsersController.create)

// LOGIN

const jwt = require('jsonwebtoken')
const passport = require('passport')
/* POST login. */
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

module.exports = router
