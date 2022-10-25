const aws = require('aws-sdk')
const { v4 } = require('uuid')

const s3 = new aws.S3({
    region: 'us-east-1',
    accessKeyId:process.env.S3_ACCESS_ID,
    secretAccessKey:process.env.S3_SECRET_ACCESS_KEY,
    signatureVersion: 'v4',
})

const bucket = process.env.S3_BUCKET 

async function generateUpload() {
    const imageName = v4()

    const params = {
        Bucket: bucket,
        Key: imageName,
        Expires: 60
    }

    const url = await s3.getSignedUrlPromise('putObject', params)

    return url
}

module.exports = { generateUpload }