import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
export class IacStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const restAPI = new cdk.aws_apigateway.RestApi(this, 'restAPI', {
      restApiName: 'CoilRestAPI',
      description: 'This is the REST API for the Coil application',
      defaultCorsPreflightOptions: {
        allowOrigins: cdk.aws_apigateway.Cors.ALL_ORIGINS,
        allowMethods: cdk.aws_apigateway.Cors.ALL_METHODS,
        allowHeaders: ['*']
      }
    })

    const restAPIResource = restAPI.root.addResource('coil', {
      defaultCorsPreflightOptions: {
        allowOrigins: cdk.aws_apigateway.Cors.ALL_ORIGINS,
        allowMethods: cdk.aws_apigateway.Cors.ALL_METHODS,
        allowHeaders: ['*']
      }
    })
    
  }
}
