import Refund from '../../entities/refund' 
import * as express from 'express'

const router = express.Router()

/**
 * @api {get} /admin/refunds Get all the refunds
 * @apiGroup Admin Refunds
 * @apiVersion 1.0.0
 * 
 * @apiPermission admin
 * 
 *  * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [{ }]
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
 * @api {get} /admin/refunds/delete/:id Delete the refund
 * @apiGroup Admin Refund
 * @apiVersion 1.0.0
 * 
 * @apiParam {integer} id Mandatory Id of the refund
 * 
 * @apiPermission admin
 */
router.get('/delete/:id', async (req, res) => {
  
  try{
    await Refund.createQueryBuilder()
                  .delete()
                  .from(Refund)
                  .where("id = :id", { id: req.params.id })
                  .execute();
    res.status(200).json("L'échéance a été supprimée.")
  } catch(err) {
    res.status(500).json(err)
  }
})


export default router