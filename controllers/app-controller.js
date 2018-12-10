const db = require('../models')

module.exports = class AppController {
  constructor() {
    // Load all models in this
    Object.assign(this, db)
  }
}
