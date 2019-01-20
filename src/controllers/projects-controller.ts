import Project, { State as StateEnum } from '../entities/project'

export default class {
  /* list of the project */
  async index(req, res) {
    const projects = await Project.find({
      where: {
        state: StateEnum.valid
      }
    })
    res.json(projects)
  }

  /* get details of one project */
  getOneProject(req, res) {
    Project.findOne({
      where: { id: req.params.id }
    })
      .then(projects => {
        res.json(projects)
      })
      .catch(err => {
        res.status(404).json(err)
      })
  }

  /* create a new project */
  create(req, res) {
    Project.insert(req.body)
      .then(project => {
        res.json(project)
      })
      .catch(function(err) {
        res.json(err)
      })
  }

  /* update state of the project to running (has been founded) */
  projectFounded(req, res) {
    res.send('TODO')
  }

  getProjectByUser(req, res) {
    res.send('TODO')
  }
}
