require('dotenv').config()
const express = require('express')
// const path = require('path')
const bodyParser = require('body-parser')
const logger = require('morgan')

const db = require('./models')
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

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

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/doc', express.static('apidoc'));

module.exports = app
