const express = require('express')
const router = express.Router()

/* GET home page. */
/**
 * @api {get} / Homepage
 * @apiGroup Home
 */
router.get('/', function(req, res, next) {
  res.json({ message: 'Welcome to EUKO’s API' })
})

module.exports = router
