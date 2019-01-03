const AppController = require('./app-controller')

class ProjectsController extends AppController {
  constructor() {
    super()
    this.index = this.index.bind(this)
    this.create = this.create.bind(this)
  }

  index(req, res) {
    this.Project.findAll().then(projects => {
      res.json(projects)
    })
  }

  create(req, res) {
    this.Project.create(req.body).then(project => {
      res.json(project)
    })
  }
}

module.exports = new ProjectsController
