const express = require('express')
const router = express.Router()
import { privateRoute } from '../passport'

import OffersController from '../controllers/offers-controller'
import Offer from '../entities/offer';

/**
 * @api {post} /offers Create a offer
 * @apiVersion 1.0.0
 * @apiName CreateOffer
 * @apiDescription Create a new offer - investor will be linked by is token. By default, offer state is "waiting" for an action from the project's owner. If the owner accept, will be set to "accepted", if he refuse will be set to "refused". Turn the project's state to waiting (for acceptation by the project's owner). Return the offer, the investor and the project.
 * @apiGroup Offer
 *
 * @apiParam {String} project_id   Mandatory - Project's id.
 * @apiParam {String} signature    Signature image - base64 file
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "user": {
 *            "id": "a04d7e98-09f5-4890-bc4d-a89a799c3d65",
 *            "email": "tooooo@gmail.com",
 *            "admin": false
 *         },
 *         "project": {
 *             "id": "b0e5e002-0be8-46be-a2ea-20fbf5426116",
 *             "title": "un vélo",
 *             "description": "svp c'est urgent",
 *             "price": 200,
 *             "interests": 0.01,
 *             "state": "waiting",
 *             "timeLaps": 3,
 *             "createdDate": "2019-04-26T07:16:14.010Z",
 *             "signature_owner_photo_key": null
 *         },
 *         "state": "waiting",
 *         "signature_investor_photo_key": null,
 *         "id": "49f59cab-7c0b-4951-8399-00996307771b",
 *         "createdDate": "2019-04-26T07:21:02.527Z"
 *   }
 */
router.post('/', privateRoute, new OffersController().create)

/**
 * @api {post} /offers/refuse Refuse offer
 * @apiVersion 1.0.0
 * @apiName RefuseOffer
 * @apiDescription Project's owner can refuse the offer. Turn back the projet's state to valid to receive an another offer. Return the offer.
 * @apiGroup Offer
 *
 * @apiParam {String} offer_id   Mandatory - id of the offer.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "state": "refused",
 *       "signature_investor_photo_key": null,
 *       "id": "49f59cab-7c0b-4951-8399-00996307771b",
 *       "createdDate": "2019-04-26T07:21:02.527Z"
 *   }
 */
router.post('/refuse', privateRoute, new OffersController().refuseOffer)

/**
 * @api {post} /offers/accept Accept offer
 * @apiVersion 1.0.0
 * @apiName AcceptOffer
 * @apiDescription The project's owen accept the offer. Turn project's state to running. Return the offer. Create the deadlines refound
 * @apiGroup Offer
 *
 * @apiParam {String} offer_id   Mandatory - id of the offer.
 * @apiParam {String} signature    Signature image - base64 file
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "state": "accepted",
 *       "signature_investor_photo_key": null,
 *       "id": "49f59cab-7c0b-4951-8399-00996307771b",
 *       "createdDate": "2019-04-26T07:21:02.527Z"
 *   }
 */
router.post('/accept', privateRoute, new OffersController().acceptOffer)


/**
 * @api {get} /offers/:id Get the deadlines refound off the offer
 * @apiVersion 1.0.0
 * @apiName deadlinesRefound
 * @apiDescription Retrieve all the deadlines and there status on a offer linked to a project.
 * @apiGroup Offer
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": "49f59cab-7c0b-4951-8399-00996307771b",
 *       "state": "accepted",
 *       "createdDate": "2019-04-26T07:21:02.527Z",
 *       "signature_investor_photo_key": null,
 *       "refounds": [
 *           {
 *               "id": "637faef8-daf4-4415-ad6a-50509ed685c5",
 *               "amount": 66.8333333333333,
 *               "state": "waiting",
 *               "createdDate": "2019-05-16T14:10:31.224Z",
 *               "dueDate": "2019-06-16T14:10:31.224Z"
 *           },
 *           {
 *               "id": "aadbf202-89ee-4e5a-8022-dd30b02ec01a",
 *               "amount": 66.8333333333333,
 *               "state": "waiting",
 *               "createdDate": "2019-05-16T14:39:11.584Z",
 *               "dueDate": "2019-07-16T14:39:11.584Z"
 *           }
 *       ]
 *   }
 */
router.get('/:id', privateRoute, new OffersController().getDeadlinesRefound)


// to debug - test
// router.get('/', new OffersController().index)

export default router
