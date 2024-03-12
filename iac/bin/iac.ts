#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { IacStack } from '../lib/iac_stack';

const app = new cdk.App();

const aws_account = process.env.AWS_ACCOUNT_ID;
const aws_region = process.env.AWS_DEFAULT_REGION;

new IacStack(app, 'Coil_Mss', {
  env: {
    account: aws_account,
    region: aws_region,
  }
});

app.synth();