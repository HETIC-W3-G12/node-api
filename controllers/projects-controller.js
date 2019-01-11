const AppController = require('./app-controller')

class ProjectsController extends AppController {
  constructor() {
    super()
    this.index = this.index.bind(this)
    this.create = this.create.bind(this)
    this.getOneProject = this.getOneProject.bind(this)
    this.projectFounded = this.projectFounded.bind(this)
    this.getProjectByUser = this.getProjectByUser.bind(this)
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
    this.Project.find({
      where: { id: req.params.id }
   }).then(projects => {
      res.json(projects)
    })
  }

  /* create a new project */
  create(req, res) {
    this.Project.create(req.body)
      .then(project => {
        res.json(project)
      })
      .catch(function (err) {
        res.json(err)
      })
  }

  /* update state of the project to running (has been founded) */
  projectFounded(req,res){
    eq.params.id

    this.Project.create(req.body)
      .then(project => {
        res.json(project)
      })
      .catch(function (err) {
        res.json(err)
      })
  }

  getProjectByUser(req,res){}
}

module.exports = new ProjectsController
