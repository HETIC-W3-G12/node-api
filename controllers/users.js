const User = require('../models/user')

const index = () => {
  User.findAll().then(users => {
    return users
  })
}

module.exports = {
  index
}
