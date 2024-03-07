#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { IacStack } from "../lib/iac-stack";
import envs from '../../index'

const app = new cdk.App();

const aws_account = envs.CDK_DEFAULT_ACCOUNT;
const aws_region = envs.CDK_DEFAULT_REGION;

new IacStack(app, "IacStack", {
  env: {
    account: aws_account,
    region: aws_region,
  },
});

app.synth();
