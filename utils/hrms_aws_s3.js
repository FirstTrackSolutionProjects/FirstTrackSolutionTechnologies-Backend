const AWS = require('aws-sdk');

const HRMS_S3 = new AWS.S3({
    accessKeyId: process.env.HRMS_AWS_ACCESS_KEY_ID_,
    secretAccessKey: process.env.HRMS_AWS_SECRET_ACCESS_KEY_,
    region: process.env.HRMS_AWS_REGION_,
  });

module.exports = {HRMS_S3}