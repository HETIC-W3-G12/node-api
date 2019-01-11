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
    this.User.create(req.body)
      .then(user => {
        res.json(user)
      })
      .catch(err => {
        res.json(err)
      })
  }
}

module.exports = new UsersController
