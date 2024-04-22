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

    public async upload_image(key: string, body: Buffer) {
        await this.s3.putObject({
            Bucket: this.bucket,
            Key: key,
            Body: body,
            ACL: 'public-read',
        }).promise();
        return await this.get_image_url(key);
    }

    public async delete_folder(prefix: string) {
        return await this.s3.deleteObjects({
            Bucket: this.bucket,
            Delete: {
                Objects: [
                    { Key: prefix }
                ]
            }
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