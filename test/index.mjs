import { detectImageModerationContent } from './utils/imgModeration.utils.mjs';
import { updateAladdinDb } from './utils/api.utils.mjs';

export const handler = async (event, context) => {
    // getting data from the bucket
    const bucket = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));

    
    try {
        // const res=await videoModeration(bucket, key)
        const res = await detectImageModerationContent(bucket, key);
        const apiRes = await updateAladdinDb();
        console.log("API RES: ", apiRes);
    } catch (error) {
        // error handling.
        console.log(error)
    }
};
