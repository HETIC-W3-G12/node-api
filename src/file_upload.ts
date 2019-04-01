require('dotenv').config()

import * as AWS from 'aws-sdk'
import * as uuid from 'uuid/v1'

const bucketParams = {
  Bucket: 'euko-files',
  ACL: 'public-read'
}

AWS.config.update({ region: 'eu-west-3' })
const s3 = new AWS.S3({ apiVersion: '2006-03-01' })

export const uploadFile = (file = '', ACL = 'private') => {
  s3.upload({ ACL, Bucket: bucketParams.Bucket, Body: file, Key: uuid() }, (err, data) => {
    if (err) {
      console.log('Error', err)
    }
    if (data) {
      console.log('Upload Success', data.Location)
    }
  })
}

uploadFile('ça marche', 'public-read')

const createBucket = () => {
  console.log('Creating bucket...')
  s3.createBucket(bucketParams, (err, data) => {
    if (err) {
      console.log('Error', err)
    } else {
      console.log('Success', data.Location)
    }
  })
}

s3.listBuckets((err, data) => {
  if (err) {
    console.log('Error', err)
  } else if (
    !(data.Buckets.filter(e => e.Name === bucketParams.Bucket).length > 0)
  ) {
    createBucket()
  } else console.log(data)
})
