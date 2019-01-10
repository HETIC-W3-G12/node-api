const AppController = require('./app-controller')

class ProjectsController extends AppController {
  constructor() {
    super()
    this.index = this.index.bind(this)
    this.create = this.create.bind(this)
    this.getOneProject = this.getOneProject.bind(this)
  }

  /* list of the project */
  index(req, res) {
    this.Project.findAll({
      where: {
        state: 'valid'
      }
   }).then(projects => {
      res.json(projects)
    })
  }

  /* get details of one project */
  getOneProject(req, res) {
    this.Project.findAll({
      where: {
        id: req.params.id
      }
   }).then(projects => {
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
