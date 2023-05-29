import { rekognitionClient } from '../config/aws.config.mjs'
import { DetectModerationLabelsCommand } from "@aws-sdk/client-rekognition";

const detectImageModerationContent = async (bucket, key) => {
    const params = { Image: { S3Object: { Bucket: bucket, Name: key }, }, MaxLabels: 10 }
    const command = new DetectModerationLabelsCommand(params);
    const res = await rekognitionClient.send(command);
    return res;
}

export { detectImageModerationContent }