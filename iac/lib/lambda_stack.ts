import { Construct } from "constructs";
import { aws_lambda as lambda, aws_apigateway as apigw, aws_iam as iam, Duration} from "aws-cdk-lib";

export class LambdaStack extends Construct {

    private create_user: lambda.Function;
    private get_user: lambda.Function;
    

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

        function_lambda = new lambda.Function(
            this,
            toTittle(function_name + "_coil"),
            {
                functionName: toTittle(function_name + "_coil"),
                code: lambda.Code.fromAsset("../src/modules/" + function_name),
                handler: `${function_name}.handler`,
                environment: environment_variables,
                runtime: lambda.Runtime.NODEJS_14_X,
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
        environment_variables: Record<string, string>, restapi_resource: apigw.Resource,) {
        super(scope, id);
    }

    
    
}
