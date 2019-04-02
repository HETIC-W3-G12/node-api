import * as AWS from 'aws-sdk'
import * as uuid from 'uuid/v1'

const bucketParams = {
  Bucket: 'euko-files',
  ACL: 'public-read'
}

AWS.config.update({ region: 'eu-west-3' })
const s3 = new AWS.S3({ apiVersion: '2006-03-01' })

export const uploadFile = (file = '', name, ACL = 'private') => 
  s3.upload({ ACL, Bucket: bucketParams.Bucket, Body: file, Key: `${uuid()}-name` }).promise()

export const getFile = Key =>
  s3.getObject({ Bucket: bucketParams.Bucket, Key }).promise()

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
