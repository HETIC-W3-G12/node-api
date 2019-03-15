import Offer from '../../entities/offer' 
import * as express from 'express'

const router = express.Router()

/**
 * @api {get} /admin/offers Get all the offers
 * @apiGroup Admin Offers
 * @apiVersion 1.0.0
 * 
 * @apiPermission admin
 * 
 *  * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [{
 *      "user": {
 *          "id": "56a407a0-2527-4981-9e8c-d44f93b0a8f3",
 *          "email": "samantha.chery@hetic.net",
 *          "admin": false
 *      },
 *      "project": {
 *          "id": "61476be1-fc5f-4e20-ab0a-c8395bd8a45c",
 *          "title": "Un vélo",
 *          "description": "svp c'est pour bb",
 *          "price": 300,
 *          "interests": 0.1,
 *          "state": "unvalid",
 *          "timeLaps": 3,
 *          "createdDate": "2019-03-14T08:49:43.790Z"
 *      },
 *      "state": "waiting",
 *      "id": "e2cdf473-8e19-46e1-95ed-f89ca4a74f23",
 *      "createdDate": "2019-03-14T12:48:38.294Z",
 *      "signed_by_owner": false,
 *      "signed_by_investor": false
 *  }]
 */
router.get('/', async (req, res) => {
  try{
    const offers = await Offer.createQueryBuilder('offer')
                              .getMany()
    res.json(offers)
  } catch(err) {
    res.status(500).json(err)
  }
})

export default router