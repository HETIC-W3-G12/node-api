const AppController = require('./app-controller')

class UsersController extends AppController {
  constructor() {
    super()
    this.index = this.index.bind(this)
    this.create = this.create.bind(this)
  }

  index(req, res) {
    this.User.findAll().then(users => {
      res.json(users)
    })
  }

  create(req, res) {
    this.User.create(req.body).then(user => {
      res.json(user)
    })
  }
}

module.exports = new UsersController
