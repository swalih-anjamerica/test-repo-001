console.log('triggered aws event');

import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { RekognitionClient, DetectModerationLabelsCommand, StartContentModerationCommand, GetContentModerationCommand } from "@aws-sdk/client-rekognition";
import axios from 'axios';

const region = "us-east-2";
const s3 = new S3Client({ region });
const client = new RekognitionClient({ region });

export const handler = async (event, context) => {
  // getting data from the bucket
  const bucket = event.Records[0].s3.bucket.name;
  const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));

  try {
    // const res=await videoModeration(bucket, key)
    const res = await imageModeration(bucket, key);
    const apiRes = await updateAladdinDb();
    console.log("API RES", apiRes);
  } catch (error) {
    // error handling.
    console.log(error)
  }
};

const imageModeration = async (bucket, key) => {
  const params = { Image: { S3Object: { Bucket: bucket, Name: key }, }, MaxLabels: 10 }
  const command = new DetectModerationLabelsCommand(params);
  const res = await client.send(command);
  return res;
}
const videoModeration = async (bucket, key) => {
  const params = {
    "Video": {
      "S3Object": {
        "Bucket": bucket,
        "Name": key
      }
    },
    "MinConfidence": 50,
    "NotificationChannel": {
      "SNSTopicArn": "arn:aws:sns:us-east-1:nnnnnnnnnn:topic",
      "RoleArn": "arn:aws:iam::nnnnnnnnnn:role/roleopic"
    },
    "JobTag": "DetectingLabels"
  }
  const command = new StartContentModerationCommand(params);
  const res = await client.send(command)

  const params2 = {
    "JobId": res.JobId,
  }
  return res;
}
const updateAladdinDb = async () => {
  const res = await axios.get('https://aladdin-dev.anjtechsolutions.com/api/countries');
  return res;
}