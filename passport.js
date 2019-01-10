const passport = require('passport')
const db = require('./models')

const LocalStrategy = require('passport-local').Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    function(email, password, cb) {
      //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
      return db.User.findOne({where: { email, password }})
        .then(user => {
          console.log(user)
          if (!user) {
            return cb(null, false, { message: 'Incorrect email or password.' })
          }
          return cb(null, user.toJSON(), { message: 'Logged In Successfully' })
        })
        .catch(err => {console.log(err); return cb(err)})
    }
  )
)
