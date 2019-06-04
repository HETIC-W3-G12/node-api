import Refund from '../../entities/refund' 
import * as express from 'express'

const router = express.Router()

/**
 * @api {get} /admin/refunds Get all the refunds.
 * @apiGroup Admin Refunds
 * @apiVersion 1.0.0
 * 
 * @apiPermission admin
 * 
 *  * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [{
 *        "id": "18355bb1-594b-499e-ad90-aadcee026be6",
 *        "amount": 68.3333333333333,
 *        "state": "waiting",
 *        "createdDate": "2019-05-17T11:21:38.942Z",
 *        "dueDate": "2019-06-17T11:21:38.927Z",
 *        "offer": {
 *            "id": "6655e559-315d-4c1a-8d15-87034e0068c7",
 *          "state": "accepted",
 *          "createdDate": "2019-05-17T08:20:28.380Z",
 *          "signature_investor_photo_key": null
 *        }
 *      },
 *      {
 *        "id": "df9d63e9-9d95-4552-a1ee-d8a5fdbe5114",
 *        "amount": 68.3333333333333,
 *        "state": "waiting",
 *        "createdDate": "2019-05-17T11:21:38.961Z",
 *        "dueDate": "2019-07-17T11:21:38.960Z",
 *        "offer": {
 *          "id": "6655e559-315d-4c1a-8d15-87034e0068c7",
 *          "state": "accepted",
 *          "createdDate": "2019-05-17T08:20:28.380Z",
 *          "signature_investor_photo_key": null
 *      }
 *    },
 *    {
 *      "id": "0bd9eec2-bb12-47ac-8e13-4599d213b230",
 *      "amount": 68.3333333333333,
 *      "state": "waiting",
 *      "createdDate": "2019-05-17T11:21:38.965Z",
 *      "dueDate": "2019-08-17T11:21:38.965Z",
 *      "offer": {
 *          "id": "6655e559-315d-4c1a-8d15-87034e0068c7",
 *          "state": "accepted",
 *          "createdDate": "2019-05-17T08:20:28.380Z",
 *          "signature_investor_photo_key": null
 *      }
 *   }]
 */
router.get('/', async (req, res) => {
  try{
    const refunds = await Refund.createQueryBuilder('refund')
                              .leftJoinAndSelect('refund.offer', 'offer')
                              .getMany()
    res.json(refunds)
  } catch(err) {
    res.status(500).json(err)
  }
})

/**
 * @api {get} /admin/refunds/delete/:id Delete a refund
 * @apiGroup Admin Refund
 * @apiVersion 1.0.0
 * 
 * @apiParam {integer} id Mandatory Id of the refund
 * 
 * @apiPermission admin
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     "Le remboursement a été supprimée."
 */
router.get('/delete/:id', async (req, res) => {
  
  try{
    await Refund.createQueryBuilder()
                  .delete()
                  .from(Refund)
                  .where("id = :id", { id: req.params.id })
                  .execute();
    res.status(200).json("Le remboursement a été supprimée.")
  } catch(err) {
    res.status(500).json(err)
  }
})


export default router