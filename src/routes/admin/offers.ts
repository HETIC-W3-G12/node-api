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
                              .leftJoinAndSelect('offer.user', 'user')
                              .leftJoinAndSelect('offer.project', 'project')
                              .getMany()
    res.json(offers)
  } catch(err) {
    res.status(500).json(err)
  }
})

/**
 * @api {get} /admin/offers/delete/:id Delete the offer
 * @apiGroup Admin Offer
 * @apiVersion 1.0.0
 * 
 * @apiParam {integer} id Mandatory Id of the offer
 * 
 * @apiPermission admin
 */
router.get('/delete/:id', async (req, res) => {
  
  try{
    await Offer.createQueryBuilder()
                  .delete()
                  .from(Offer)
                  .where("id = :id", { id: req.params.id })
                  .execute();
    res.status(200).json("L'offre a été supprimée.")
  } catch(err) {
    res.status(500).json(err)
  }
})


export default router