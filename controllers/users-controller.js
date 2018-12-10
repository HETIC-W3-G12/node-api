const AppController = require('./app-controller')

class UsersController extends AppController {
  constructor() {
    super()
    this.index = this.index.bind(this)
  }

  index(req, res) {
    this.User.findAll().then(users => {
      res.json(users)
    })
  }
}

module.exports = new UsersController
