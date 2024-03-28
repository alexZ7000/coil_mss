import { Construct } from "constructs";
import { aws_lambda as lambda, aws_lambda_nodejs as lambda_js, aws_apigateway as apigw, aws_iam as iam, Duration} from "aws-cdk-lib";

export class LambdaStack extends Construct {

    private core_layer: lambda.LayerVersion;

    private auth_user: lambda_js.NodejsFunction;
    private create_moderator: lambda_js.NodejsFunction;

    public functions_need_dynamodb_access: lambda.Function[] = [];
    

    private create_lambda(
        function_name: string,
        environment_variables: {[key: string]: string},
        method: string,
        restapi_resource: apigw.Resource,
        need_prisma: boolean = true,
        origins: string[] = apigw.Cors.ALL_ORIGINS
    ) {

        function toTittle(string:string) {
            return string.toLowerCase().split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join("_");
        }

        let layers: lambda.ILayerVersion[]
        let function_lambda: lambda.Function;

        layers = [this.core_layer];

        function_lambda = new lambda_js.NodejsFunction(
            this,
            toTittle(function_name + "_coil"),
            {
                functionName: toTittle(function_name + "_coil"),
                entry: `../src/modules/${function_name}/app/${function_name}_presenter.ts`,
                handler: `handler`,
                environment: environment_variables,
                runtime: lambda.Runtime.NODEJS_20_X,
                layers: layers,
                timeout: Duration.seconds(15),
                memorySize: 256,
                bundling: need_prisma ? {
                    nodeModules: ['@prisma/client', 'prisma'],
                    commandHooks: {
                        beforeBundling(inputDir: string, outputDir: string) {
                            return [];
                        },
                        beforeInstall(inputDir: string, outputDir: string) {
                            return [`cp -R ${inputDir}/src/modules/${function_name}/prisma ${outputDir}/src/modules/${function_name}/`];
                        },
                        afterBundling(inputDir: string, outputDir: string) {
                            return [
                                `cd ${outputDir}`,
                                `prisma generate`,
                                `rm -rf node_modules/@prisma/engines`,
                                `rm -rf node_modules/@prisma/client/node_modules node_modules/.bin node_modules/prisma`,
                            ]
                        }
                    }
                } : undefined
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


    constructor(
        scope: Construct,
        id: string,
        environment_variables: {[key: string]: string },
        restapi_resource: apigw.Resource
        ) {
        super(scope, id);

        let origins = ["*"];
        if (environment_variables["STAGE"] === "prod") {
            origins = [environment_variables["DOMAIN"]];
        }

        this.core_layer = new lambda.LayerVersion(
            this, "Coil_Mss_Core_Layer",
            {
                code: lambda.Code.fromAsset("../src/core"),
                compatibleRuntimes: [lambda.Runtime.NODEJS_20_X],
                description: "Coil MSS Core Layer",
            }
        );

        this.create_moderator = this.create_lambda(
            "create_moderator",
            environment_variables,
            "POST",
            restapi_resource,
            true,
            origins
        );

        this.auth_user = this.create_lambda(
            "auth_user",
            environment_variables,
            "GET",
            restapi_resource,
            true,
            origins
        );

        this.functions_need_dynamodb_access = [

        ]
    }
}
