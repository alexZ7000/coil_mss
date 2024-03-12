import * as cdk from 'aws-cdk-lib';
import { RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import { LambdaStack } from './lambda_stack';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class IacStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const ENVIROMMENT_VARIABLES = {
      "STAGE": process.env.STAGE || "dev",
      "DOMAIN": process.env.DOMAIN || "localhost",
    };

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

    const coil_resource = restapi.root.addResource("coil", {
      defaultCorsPreflightOptions: {
        allowOrigins: ["*"],
        allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowHeaders: ["*"],
      }
    });

    const lambda_stack = new LambdaStack(
      this,
      "Coil_Lambda_Stack",
      ENVIROMMENT_VARIABLES,
      coil_resource
    );
  }
}
