import { pick, forEach } from 'lodash'
import { validate } from 'class-validator'

import Offer, { State as StateEnum } from '../entities/offer'
import Project, {State as StateProjectEnum}  from '../entities/project'
import Refund, {State as StateRefundEnum}  from '../entities/refund'
import { uploadFile, getFile } from '../file_upload'

export default class {
  /**
   * CREATE a new offer
   */ 
  async create(req, res) {

    const params = pick(req.body, ['project_id', 'signature'])

    const offer = new Offer()

    offer.user = req.user
    const project = await Project.findOne({ where: {id : params['project_id'] } })

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

    const offer = await Offer.createQueryBuilder('offer')
                              .where("id = :id", { id: params['offer_id'] })
                              .getOne()

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
    const params = pick(req.body, ['offer_id', 'signature'])
    
    const offer = await Offer.createQueryBuilder('offer')
                              .where("offer.id = :id", { id: params['offer_id'] })
                              .leftJoinAndSelect('offer.project', 'project')
                              .getOne()

    offer.state = StateEnum.ACCEPTED

    try {
      // update project

      const project = await Project.createQueryBuilder('project')
                            .where("id = :id", { id: offer.project.id })
                            .getOne()

      project.state = StateProjectEnum.RUNNING;
      await project.save()

      // create the reafound deadlines 
      const amountInterest = ( ( project.price * project.interests ) / 12 ) * project.timeLaps
      const amountRefund = ( project.price + amountInterest ) / project.timeLaps

      for (let i = 1; i <= project.timeLaps; i++){
        const refund = new Refund()
        refund.state = StateRefundEnum.WAITING;
        refund.amount = amountRefund

        const d = new Date()
        d.setMonth(d.getMonth() + i )
        refund.dueDate = d
        refund.offer = offer
        
        await refund.save()
      }

      if (params.signature) {
        const file = await uploadFile(params.signature, 'signature_owner')
        offer.signature_owner_photo_key = file.Key
      } else {
        res.status(400).json({
          message: 'You have to sign the offer'
        })
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
    } catch(err) {
      res.status(500).json(err)
    }
  }

  /**
   * GET details of an offer = all the refund deadlines 
   */
  async getDeadlinesRefund(req, res){
    try {
      const offer = await Offer.createQueryBuilder('offer')
                                .where("offer.id = :id", { id: req.params.id })
                                .leftJoinAndSelect('offer.refunds', 'refund')
                                .leftJoinAndSelect('offer.project', 'project')
                                .leftJoinAndSelect('offer.user', 'user')
                                .getOne()

      const payload = {
        ...offer,
        signature_investor: null,
        signature_owner: null
      }

      if (offer.signature_investor_photo_key) {
        payload.signature_investor = await getFile(offer.signature_investor_photo_key)
      }

      if (offer.signature_owner_photo_key) {
        payload.signature_owner = await getFile(offer.signature_owner_photo_key)
      }

      res.json(payload)
    } catch(err) {
      res.status(500).json(err)
    }
  }
}
