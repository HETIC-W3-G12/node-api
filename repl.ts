// Require the REPL module
// and models
const repl = require('repl').start({})

import { createConnection } from 'typeorm'
const normalizedPath = require('path').join(__dirname, 'src/entities')
const models = {}

require('fs')
  .readdirSync(normalizedPath)
  .forEach(function(file) {
    models[file.charAt(0).toUpperCase() + file.slice(1, -3)] = require('./src/entities/' + file).default
  })

// Make the `models` object
// a global variable in the
// REPL
repl.context.models = models
createConnection().then(connection => {
  repl.context.connection = connection
  let modelsNames = ''
  // Make each model a global
  // object in the REPL
  Object.keys(models).forEach(modelName => {
    repl.context[modelName] = models[modelName]
    modelsNames = modelsNames + modelName + ', '
  })
  console.log(`TypeORM ready: ${modelsNames}`)
})

repl.context.log = async data => {
  console.log(await data)
}
