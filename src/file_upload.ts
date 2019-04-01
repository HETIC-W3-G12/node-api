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
  return new Promise((resolve, reject) => {
    s3.upload(
      { ACL, Bucket: bucketParams.Bucket, Body: file, Key: uuid() },
      (err, data) => {
        if (err) {
          reject(err)
        }
        if (data) {
          resolve(data)
        }
      }
    )
  })
}

export const getFile = Key => {
  return new Promise((resolve, reject) => {
    s3.getObject({ Bucket: bucketParams.Bucket, Key }, (err, data) => {
      if (err) reject(err.stack)
      // an error occurred
      else resolve(data) // successful response
    })
  })
}

// uploadFile('ça marche', 'public-read').then(resp => {
//   console.log(resp)
// })
// getFile('06db7fb0-5486-11e9-8a24-e36ffb5f701b')
//   .then(resp => {
//     console.log(resp)
//   })
//   .catch(err => {
//     console.log(err)
//   })

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
  } // else console.log(data)
})