require('dotenv').config()
import * as express from 'express'
const passport = require('passport')
const bodyParser = require('body-parser')
const logger = require('morgan')

const db = require('./models')
const usersRouter = require('./routes/users')
const projectsRouter = require('./routes/projects')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
// app.use(express.static(path.join(__dirname, 'public')))

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

require('./passport')

app.use('/', express.static('apidoc'))
app.use('/users', usersRouter)
app.use('/projects', projectsRouter)

app.use('/secret', passport.authenticate('jwt', {session: false}), (req, res) => res.send('secret route'))

module.exports = app
