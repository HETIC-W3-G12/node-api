const express = require('express')
const router = express.Router()

import { getFile, uploadFile } from '../file_upload'

router.post('/', (req, res) => {
  uploadFile(req.body.file, req.body.name).then(resp => {
    res.json(resp)
  }).catch(err => {
    res.json(err)
  })
})

router.get('/:uuid', (req, res) => {
  getFile(req.params.uuid).then(resp => {
    res.json(resp)
  }).catch(err => {
    res.json(err)
  })
})

export default router
