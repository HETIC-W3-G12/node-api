const passport = require('passport')
const passportJWT = require('passport-jwt')
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

import User from './entities/user'

const LocalStrategy = require('passport-local').Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    function(email, password, cb) {
      //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
      return User.findOne({ where: { email, password } })
        .then(user => {
          console.log(user)
          if (!user) {
            return cb(null, false, { message: 'Incorrect email or password.' })
          }
          return cb(null, Object.assign({}, user), { message: 'Logged In Successfully' })
        })
        .catch(err => {
          console.log(err)
          return cb(err)
        })
    }
  )
)

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    },
    function(jwtPayload, cb) {
      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
      return User.findOne({ where: { id: jwtPayload.id }})
        .then(user => {
          return cb(null, Object.assign({}, user))
        })
        .catch(err => {
          return cb(err)
        })
    }
  )
)
