import { StartContentModerationCommand } from "@aws-sdk/client-rekognition";
import { rekognitionClient } from "../config/aws.config.mjs";

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
    const res = await rekognitionClient.send(command)

    const params2 = {
        "JobId": res.JobId,
    }
    return res;
}