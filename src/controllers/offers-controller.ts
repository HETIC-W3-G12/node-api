import Offer, { State as StateEnum } from '../entities/offer'
import Project from '../entities/project'

import { pick, forEach } from 'lodash'
import { validate } from 'class-validator'

export default class {
  /* list of the existing offers */
  async index(req, res) {
    const offers = await Offer.createQueryBuilder('offer')
      .getMany()
    res.json(offers)
  }

  /* create a new offer */
  async create(req, res) {

    const params = pick(req.body, ['project_id'])

    const offer = new Offer()

    offer.user = req.user
    const project = await Project.findOne(Project, params['project_id'])

    offer.project = project
    offer.state = StateEnum.WAITING

    const errors = await validate(offer)
    if (errors.length > 0) {
        res.status(400).json(errors)
    } else {
      offer.save().then(project => {
          res.status(200).json(project)
      }).catch(err => {
          res.status(500).json(err)
      })
    }
  }
}
