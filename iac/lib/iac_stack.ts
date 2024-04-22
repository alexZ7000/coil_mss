import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';
import { LambdaStack } from './lambda_stack';
import { RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Bucket, BucketAccessControl, BlockPublicAccess } from 'aws-cdk-lib/aws-s3';


export class IacStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    const restapi = new RestApi(
      this, "Coil_Restapi", {
      restApiName: "CoilRestApi",
      description: "This is the REST API for the Coil mss application.",
      defaultCorsPreflightOptions: {
        allowOrigins: ["*"],
        allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowHeaders: ["*"],
      }}
    );

    const bucket = new Bucket(this, "Coil_Bucket", {
      bucketName: "coil-bucket",
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      blockPublicAccess: {
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      },
      publicReadAccess: true,
    });

    const coil_resource = restapi.root.addResource("coil", {
      defaultCorsPreflightOptions: {
        allowOrigins: ["*"],
        allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowHeaders: ["*"],
      }
    });

    const ENVIROMMENT_VARIABLES: {[key: string]: string} = {
      "AWS_ACCOUNT_ID": process.env.AWS_ACCOUNT_ID || "",
      "DOMAIN": process.env.DOMAIN || "",
      "STAGE": process.env.STAGE || "test",
      "AZURE_URL": process.env.AZURE_URL || "",
      "SECRET_KEY": process.env.SECRET_KEY || "",
      "AWS_BUCKET": bucket.bucketName,
      "RDS_HOSTNAME": process.env.RDS_HOSTNAME || "",
      "RDS_PORT": process.env.RDS_PORT || "",
      "RDS_DB_NAME": process.env.RDS_DB_NAME || "",
      "RDS_USERNAME": process.env.RDS_USERNAME || "",
      "RDS_PASSWORD": process.env.RDS_PASSWORD || "",
      "RDS_DIALECT": process.env.RDS_DIALECT || "",
    };

    const lambda_stack = new LambdaStack(
      this,
      "Coil_Lambda_Stack",
      ENVIROMMENT_VARIABLES,
      coil_resource
    );

    for (const lambda_function of lambda_stack.functions_need_event_bridge_access) {
      lambda_function.addToRolePolicy(
        new iam.PolicyStatement({
          actions: ["events:*", "lambda:*"],
          resources: ["*"],
        })
      );
    }
  }
}
