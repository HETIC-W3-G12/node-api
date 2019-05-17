import Offer, { State as StateEnum } from '../entities/offer'
import Project, {State as StateProjectEnum}  from '../entities/project'
import Refound, {State as StateRefoundEnum}  from '../entities/refound'
import { uploadFile } from '../file_upload'

import { pick, forEach } from 'lodash'
import { validate } from 'class-validator'

export default class {
  /**
   * CREATE a new offer
   */ 
  async create(req, res) {

    const params = pick(req.body, ['project_id', 'signature'])

    const offer = new Offer()

    offer.user = req.user
    const project = await Project.findOne(Project, params['project_id'])

    project.state = StateProjectEnum.WAITING;
    project.save()

    offer.project = project
    offer.state = StateEnum.WAITING

    if (params.signature) {
      const file = await uploadFile(params.signature, 'signature_investor')
      offer.signature_investor_photo_key = file.Key
    } else {
      res.status(400).json({
        message: 'You have to sign the offer'
      })
    }
    
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

  /*
  * Refuse offer
  */ 
  async refuseOffer(req, res) {
    const params = pick(req.body, ['offer_id'])
    const offer = await Offer.findOne(Offer, params['offer_id'])

    // update project
    const project = await Project.findOne(offer.project)
    project.state = StateProjectEnum.VALID;
    project.save()

    offer.state = StateEnum.REFUSED
    const errors = await validate(offer)
    if (errors.length > 0) {
        res.status(400).json(errors)
    } else {
      offer.save().then(offer => {
          res.status(200).json(offer)
      }).catch(err => {
          res.status(500).json(err)
      })
    }
  }

  /*
  * Accept offer
  */ 
  async acceptOffer(req, res) {
    const params = pick(req.body, ['offer_id'])
    
    const offer = await Offer.findOne(Offer, params['offer_id'])
    offer.state = StateEnum.ACCEPTED
    
    // update project
    const project = await Project.findOne(offer.project)
    project.state = StateProjectEnum.RUNNING;
    project.save()

    // create the reafound deadlines 
    var amountInterest = ( ( project.price * project.interests ) / 12 ) * project.timeLaps
    var amountRefound = ( project.price + amountInterest ) / project.timeLaps

    for(var i = 1; i <= project.timeLaps; i++){
      const refound = new Refound()
      refound.state = StateRefoundEnum.WAITING;
      refound.amount = amountRefound

      var d = new Date()
      d.setMonth(d.getMonth() + i )
      refound.dueDate = d
      refound.offer = offer
      
      // console.log('--------- ici')
      // console.log(refound)
      await refound.save()

    }

    const errors = await validate(offer)
    if (errors.length > 0) {
        res.status(400).json(errors)
    } else {
      offer.save().then(offer => {
          res.status(200).json(offer)
      }).catch(err => {
          res.status(500).json(err)
      })
    }
  }

  /**
   * GET list of the offers -- to test and debug
   */ 
  async index(req, res) {
    try {
      const offers = await Offer.createQueryBuilder('offer')
                                .leftJoinAndSelect('offer.user', 'user')
                                .getMany()
      res.json(offers)
    } catch(err) {
      res.status(500).json(err)
    }
  }

  /**
   * GET details of an offer = all the refound deadlines 
   */
  async getDeadlinesRefound(req, res) {

    Offer.find({
      where: { id: req.params.id },
      relations: [ "refounds" ]
    })
      .then(offer => {
        res.json(offer)
      })
      .catch(err => {
        res.status(404).json(err)
      })
  }
}
