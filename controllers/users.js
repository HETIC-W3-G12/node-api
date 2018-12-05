const User = require('../models/user')

const index = (req, res) => {
  User.findAll().then(users => {
    res.send(users)
  })
}

module.exports = {
  index
}
