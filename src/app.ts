require('dotenv').config()
import 'reflect-metadata'
import * as express from 'express'
const passport = require('passport')
const bodyParser = require('body-parser')
const logger = require('morgan')
import { createConnection } from 'typeorm'

// const db = require('./models')
import usersRouter from './routes/users'
// const projectsRouter = require('./routes/projects')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// createConnection method will automatically read connection options
// from your ormconfig file or environment variables
createConnection().then(connection => {
  require('./passport')

  app.use('/', express.static('apidoc'))
  app.use('/users', usersRouter)
  // app.use('/projects', projectsRouter)

  app.use('/secret', passport.authenticate('jwt', {session: false}), (req, res) => res.send(req.user))
})

module.exports = app
