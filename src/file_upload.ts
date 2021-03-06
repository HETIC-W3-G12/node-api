import * as AWS from 'aws-sdk'
import * as uuid from 'uuid/v1'

const bucketParams = {
  Bucket: 'euko-files',
  ACL: 'public-read'
}

AWS.config.update({ region: 'eu-west-3' })
const s3 = new AWS.S3({ apiVersion: '2006-03-01' })

// @data {string} file in base64
// @name {string} filename
// @ACL https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html#canned-acl
export const uploadFile = (data, name, ACL = 'private') => 
  s3.upload({ ACL, Bucket: bucketParams.Bucket, Body: new Buffer(data, 'base64'), Key: `${uuid()}-${name}` }).promise()

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
