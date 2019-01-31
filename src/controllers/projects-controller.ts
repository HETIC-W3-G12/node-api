import Project, { State as StateEnum } from '../entities/project'
import { pick, forEach } from 'lodash'
import { validate } from 'class-validator'

export default class {
  /* list of the project */
  async index(req, res) {
    const projects = await Project.createQueryBuilder('project')
      .innerJoinAndSelect('project.user', 'user')
      .select(['project.id', 'project.title', 'project.description', 'project.price', 'project.interests', 'project.state', 'project.timeLaps', 'project.createdDate', 'user.id'])
      .getMany()
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
  async create(req, res) {
    const params = pick(req.body, [
      'title', 'description', 'price', 'interests', 'timeLaps'
    ])
    const project = new Project()
    forEach(params, (value, key) => {
      project[key] = value
    })
    project.user = req.user
    project.state = StateEnum.valid

    const errors = await validate(project)
    if (errors.length > 0) {
      res.status(400).json(errors)
    } else {
      project.save().then(project => {
        res.json(project)
      }).catch(err => {
        res.status(500).json(err)
      })
    }
  }

  /* update state of the project to running (has been founded) */
  projectFounded(req, res) {
    res.send('TODO')
  }

  getProjectByUser(req, res) {
    res.send('TODO')
  }
}
