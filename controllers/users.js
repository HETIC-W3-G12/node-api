const db = require('../models')
const User = db.User

const index = (req, res) => {
  User.findAll().then(users => {
    res.send(users)
  })
}

module.exports = {
  index
}
