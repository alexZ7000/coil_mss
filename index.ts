import { config } from "dotenv";
import path from 'path'

config({ path: path.resolve(__dirname, "./.env") });

const envs = {
  STAGE: process.env.STAGE,
  REGION: process.env.REGION,
  STACK_NAME: process.env.STACK_NAME,
  ENDPOINT_URL: process.env.ENDPOINT_URL,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  MSS_NAME: process.env.MSS_NAME,
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
  CLOUD_FRONT_DISTRIBUTION_DOMAIN: process.env.CLOUD_FRONT_DISTRIBUTION_DOMAIN,
  JWT_SECRET: process.env.JWT_SECRET,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
  CDK_DEFAULT_ACCOUNT: process.env.CDK_DEFAULT_ACCOUNT,
  CDK_DEFAULT_REGION: process.env.CDK_DEFAULT_REGION,
};
console.log(envs);

export default envs;
