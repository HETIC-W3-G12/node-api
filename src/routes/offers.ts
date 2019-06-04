const express = require('express')
const router = express.Router()
import { privateRoute } from '../passport'

import OffersController from '../controllers/offers-controller'
import Offer from '../entities/offer';

/**
 * @api {post} /offers Create an offer.
 * @apiVersion 1.0.0
 * @apiName CreateOffer
 * @apiDescription Create a new offer - investor will be linked by is token. By default, offer's state is "waiting" for an action from the project's owner. If the owner accept, will be set to "accepted", if he refuse will be set to "refused". Turn the project's state to waiting (for acceptation by the project's owner). Return the offer, the investor and the project.
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
 * @api {post} /offers/refuse Refuse an offer.
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
 * @api {post} /offers/accept Accept an offer.
 * @apiVersion 1.0.0
 * @apiName AcceptOffer
 * @apiDescription The project's owen accept the offer. Turn project's state to running and create the refunds's deadlines associated. Return the offer. 
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
 * @api {get} /offers/:id Get offer's details and refunds's deadlines.
 * @apiVersion 1.0.0
 * @apiName deadlinesRefund
 * @apiDescription Retrieve all the deadlines and there status on a offer linked to a project.
 * @apiGroup Offer
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *  {
 *   "id": "741c1bba-f897-4e9f-aebc-d337097acd45",
 *   "state": "accepted",
 *   "createdDate": "2019-05-28T23:09:53.813Z",
 *   "signature_investor_photo_key": "b3c595f0-819d-11e9-9978-25d251e34839-signature_investor",
 *   "signature_owner_photo_key": "e5e85d10-819d-11e9-9978-25d251e34839-signature_owner",
 *   "refunds": [
 *     {
 *       "id": "708c63fd-26b0-4785-91b1-c7e6ac434c1d",
 *       "amount": 180.833333333333,
 *       "state": "waiting",
 *       "createdDate": "2019-05-28T23:11:17.832Z",
 *       "dueDate": "2019-06-28T23:11:17.830Z"
 *     },
 *     {
 *       "id": "794cb06c-fa20-4a5d-8b98-73dd2cb68ea6",
 *       "amount": 180.833333333333,
 *       "state": "waiting",
 *       "createdDate": "2019-05-28T23:11:17.842Z",
 *       "dueDate": "2019-07-28T23:11:17.841Z"
 *     },
 *     {
 *       "id": "25b612e6-2d4c-4a7f-b2f4-7893eff3187b",
 *       "amount": 180.833333333333,
 *       "state": "waiting",
 *       "createdDate": "2019-05-28T23:11:17.847Z",
 *       "dueDate": "2019-08-28T23:11:17.846Z"
 *     },
 *     {
 *       "id": "2112e473-6155-4701-841e-e810525126ec",
 *       "amount": 180.833333333333,
 *       "state": "waiting",
 *       "createdDate": "2019-05-28T23:11:17.852Z",
 *       "dueDate": "2019-09-28T23:11:17.851Z"
 *     }
 *   ],
 *   "project": {
 *     "id": "f3329178-fa9c-4bed-847d-ccb1f176818e",
 *     "title": "aozkdiajzd",
 *     "description": "pzkeozkjdinf",
 *     "price": 700,
 *     "interests": 0.1,
 *     "state": "running",
 *     "timeLaps": 4,
 *     "createdDate": "2019-05-17T12:32:05.768Z"
 *   },
 *   "user": {
 *     "id": "76727e6c-de35-4993-a975-7372f6b8a038",
 *     "email": "m.sentenac@euko.co",
 *     "firstname": "Marwan",
 *     "lastname": "SENTENAC",
 *     "birthdate": "1991-12-27T23:00:00.000Z",
 *     "birthplace": "Paris 10",
 *     "adress": "10 place Paul Verlaine",
 *     "city": "Paris",
 *     "postCode": 75013,
 *     "identity_key": null,
 *     "face_photo_key": null,
 *     "admin": false,
 *     "createdDate": "2019-04-24T08:38:51.598Z"
 *   },
 *   "signature_investor": {
 *     "AcceptRanges": "bytes",
 *     "LastModified": "2019-05-28T23:09:54.000Z",
 *     "ContentLength": 6,
 *     "ETag": "\"eb6a2821087843374d527b453377399e\"",
 *     "ContentType": "application/octet-stream",
 *     "Metadata": {},
 *     "Body": {
 *       "type": "Buffer",
 *       "data": [
 *         162,
 *         72,
 *         226,
 *         134,
 *         57,
 *         228
 *       ]
 *     }
 *   },
 *   "signature_owner": {
 *     "AcceptRanges": "bytes",
 *     "LastModified": "2019-05-28T23:11:18.000Z",
 *     "ContentLength": 6,
 *     "ETag": "\"eb6a2821087843374d527b453377399e\"",
 *     "ContentType": "application/octet-stream",
 *     "Metadata": {},
 *     "Body": {
 *       "type": "Buffer",
 *       "data": [
 *         162,
 *         72,
 *         226,
 *         134,
 *         57,
 *         228
 *       ]
 *     }
 *   }
 * }
 */
router.get('/:id', privateRoute, new OffersController().getDeadlinesRefund)


export default router
