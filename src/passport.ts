const passport = require('passport')
const passportJWT = require('passport-jwt')
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt
import * as bcrypt from 'bcrypt'
import { pick } from 'lodash'

import User from './entities/user'

const LocalStrategy = require('passport-local').Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    (email, password, cb) => {
      //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
      return User.findOne({
        select: ['id', 'email', 'password', 'firstname', 'lastname', 'birthdate', 'birthplace', 'adress', 'city', 'postCode'],
        where: { email }
      })
        .then(user => {
          if (!user) {
            return cb(null, false, {
              message: 'Incorrect email or password.'
            })
          }
          bcrypt.compare(password, user.password).then(function(res) {
            if (res) {
              return cb(null, pick(user, ['id', 'email', 'firstname', 'lastname', 'birthdate', 'birthplace', 'adress', 'city', 'postCode']), {
                message: 'Logged In Successfully'
              })
            } else return cb(null, false, {
              message: 'Incorrect email or password.'
            })
          })
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
    async (jwtPayload, cb) => {
      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
      console.log(jwtPayload)
      const user = await User.findOne({ where: { id: jwtPayload.id } }).catch(err => {
        console.log(err)
        return cb(err)
      })

      if (!user) {
        return cb(null, false, {
          message: 'Incorrect user'
        })
      }
      return cb(null, {id: user.id, email: user.email, admin: user.admin})
    }
  )
)

export const privateRoute = passport.authenticate('jwt', {session: false})
