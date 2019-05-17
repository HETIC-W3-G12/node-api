import Offer, { State as StateEnum } from '../entities/offer'
import Project, {State as StateProjectEnum}  from '../entities/project'
import Refund, {State as StateRefundEnum}  from '../entities/refund'


import { pick, forEach } from 'lodash'
import { validate } from 'class-validator'

export default class {
  /**
   * CREATE a new offer
   */ 
  async create(req, res) {

    const params = pick(req.body, ['project_id'])

    const offer = new Offer()

    offer.user = req.user
    const project = await Project.findOne({ where: {id : params['project_id'] } })

    project.state = StateProjectEnum.WAITING;
    project.save()

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
    
    const offer = await Offer.createQueryBuilder('offer')
                              .where("id = :id", { id: req.params.id })
                              .getOne()

    offer.state = StateEnum.ACCEPTED
    
    // update project
    const project = await Project.findOne(offer.project)
    project.state = StateProjectEnum.RUNNING;
    project.save()

    // create the reafound deadlines 
    var amountInterest = ( ( project.price * project.interests ) / 12 ) * project.timeLaps
    var amountRefund = ( project.price + amountInterest ) / project.timeLaps

    for(var i = 1; i <= project.timeLaps; i++){
      const refund = new Refund()
      refund.state = StateRefundEnum.WAITING;
      refund.amount = amountRefund

      var d = new Date()
      d.setMonth(d.getMonth() + i )
      refund.dueDate = d
      refund.offer = offer
      
      // console.log('--------- ici')
      // console.log(refund)
      await refund.save()

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
    try{
      const offers = await Offer.createQueryBuilder('offer')
                                .leftJoinAndSelect('offer.user', 'user')
                                .getMany()
      res.json(offers)
    } catch(err) {
      res.status(500).json(err)
    }
  }

  /**
   * GET details of an offer = all the refund deadlines 
   */
  async getDeadlinesRefund(req, res){

    Offer.find({
      where: { id: req.params.id },
      relations: [ "refunds" ]
    })
      .then(offer => {
        res.json(offer)
      })
      .catch(err => {
        res.status(404).json(err)
      })
  }
}


