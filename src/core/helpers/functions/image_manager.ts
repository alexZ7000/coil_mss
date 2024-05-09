import dotenv from 'dotenv';
import { S3 } from 'aws-sdk';

dotenv.config();


export class ImageManager {
    private s3: S3;
    private bucket: string;

    constructor() {
        this.s3 = new S3();
        this.bucket = process.env.AWS_BUCKET as string;
    }

    public async upload_image(key: string, body: Buffer, content_type: string) {
        await this.s3.putObject({
            Bucket: this.bucket,
            Key: key,
            Body: body,
            ContentType: content_type,
        }).promise();
        return await this.get_image_url(key);
    }

    public async delete_folder(prefix: string) {
        const objects = await this.s3.listObjectsV2({
            Bucket: this.bucket,
            Prefix: prefix,
        }).promise();

        if (!objects.Contents) {
            return;
        }

        await this.s3.deleteObjects({
            Bucket: this.bucket,
            Delete: {
                Objects: objects.Contents.map(object => ({ Key: object.Key || '' })),
            },
        }).promise();

        return await this.s3.deleteObject({
            Bucket: this.bucket,
            Key: prefix,
        }).promise();
    }

    public async delete_image(key: string) {
        return await this.s3.deleteObject({
            Bucket: this.bucket,
            Key: key,
        }).promise();
    }

    private async get_image_url(key: string) {
        return `https://${this.bucket}.s3.amazonaws.com/${key}`;
    }
}