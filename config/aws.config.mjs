import { S3Client } from '@aws-sdk/client-s3';
import { RekognitionClient } from "@aws-sdk/client-rekognition";

const region = "us-east-2";
const s3Client = new S3Client({ region });
const rekognitionClient = new RekognitionClient({ region });

export { s3Client, rekognitionClient }