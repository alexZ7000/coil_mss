import * as cdk from 'aws-cdk-lib';
import { RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import { DynamoStack } from './dynamo_stack';
import { LambdaStack } from './lambda_stack';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

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

    const coil_resource = restapi.root.addResource("coil", {
      defaultCorsPreflightOptions: {
        allowOrigins: ["*"],
        allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowHeaders: ["*"],
      }
    });

    const dynamodb_stack = new DynamoStack(this); 

    const ENVIROMMENT_VARIABLES: {[key: string]: string} = {
      "DOMAIN": process.env.DOMAIN || "",
      "STAGE": process.env.STAGE || "test",
      "AZURE_URL": process.env.AZURE_URL || "",
      "SECRET_KEY": process.env.SECRET_KEY || "",
      "DATABASE_URL": process.env.DATABASE_URL || "",
      "PROJECT_TABLE": dynamodb_stack.project_table.tableName,
    };

    const lambda_stack = new LambdaStack(
      this,
      "Coil_Lambda_Stack",
      ENVIROMMENT_VARIABLES,
      coil_resource
    );

    for (let function_lambda of lambda_stack.functions_need_dynamodb_access) {
      dynamodb_stack.project_table.grantReadWriteData(function_lambda);
    }
  }
}
