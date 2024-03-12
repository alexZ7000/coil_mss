import * as path from "path";
import { Construct } from "constructs";
import { aws_lambda_nodejs as lambda_node, aws_apigateway as apigw, Duration, aws_lambda as lambda} from "aws-cdk-lib";

export class LambdaStack extends Construct {

    public get_user: lambda_node.NodejsFunction;

    // Create a lambda function and add it to the API Gateway
    private create_lambda(
        function_name: string,
        environment_variables: { [key: string]: string; },
        method: string,
        restapi_resource: apigw.Resource,
        origins: string[] = apigw.Cors.ALL_ORIGINS,
        more_layers: lambda.ILayerVersion[] = []
    ) {

        function toTittle(string:string) {
            return string.toLowerCase().split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join("_");
        }

        let layers: lambda.ILayerVersion[]
        let function_lambda: lambda.Function;

        layers = [];
        layers = more_layers.length > 0 ? layers.concat(more_layers) : layers;

        function_lambda = new lambda_node.NodejsFunction(
            this,
            toTittle(function_name + "_coil"),
            {
                functionName: toTittle(function_name + "_coil"),
                entry: path.join(`../src/modules/${function_name}/app/${function_name}.ts`),
                handler: `handler`,
                environment: environment_variables,
                runtime: lambda.Runtime.NODEJS_20_X,
                layers: layers,
                timeout: Duration.seconds(15),
                memorySize: 256,
            }
        );

        restapi_resource.addResource(function_name.replace("_", "-"),{
            defaultCorsPreflightOptions: {
                allowOrigins: origins,
                allowMethods: [method],
                allowHeaders: ["*"],
            }
        }).addMethod(method, new apigw.LambdaIntegration(function_lambda));

        return function_lambda;
    }


    constructor(scope: Construct, id: string,
        environment_variables: { [key: string]: string; }, restapi_resource: apigw.Resource,) {
        super(scope, id);

        this.get_user = this.create_lambda("get_user", environment_variables, "GET", restapi_resource);
        this.create_user = this.create_lambda("create_user", environment_variables, "POST", restapi_resource);
        
    }

    
    
}