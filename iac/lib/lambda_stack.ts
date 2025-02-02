import { Construct } from "constructs";
import { aws_lambda as lambda, aws_lambda_nodejs as lambda_js, aws_apigateway as apigw, aws_iam as iam, Duration } from "aws-cdk-lib";

export class LambdaStack extends Construct {

    private get_user: lambda_js.NodejsFunction;
    private auth_user: lambda_js.NodejsFunction;
    private create_moderator: lambda_js.NodejsFunction;
    private get_all_moderators: lambda_js.NodejsFunction;
    private delete_moderator: lambda_js.NodejsFunction;

    private get_institution: lambda_js.NodejsFunction;
    private create_institution: lambda_js.NodejsFunction;
    private update_institution: lambda_js.NodejsFunction;
    private get_all_institutions: lambda_js.NodejsFunction;
    private get_institution_requirements: lambda_js.NodejsFunction;

    private assign_user: lambda_js.NodejsFunction;
    private get_activity: lambda_js.NodejsFunction;
    private create_activity: lambda_js.NodejsFunction;
    private update_activity: lambda_js.NodejsFunction;
    private get_all_activities: lambda_js.NodejsFunction;
    private update_users_activity: lambda_js.NodejsFunction;
    private update_activity_event: lambda_js.NodejsFunction;
    private get_activity_requirements: lambda_js.NodejsFunction;
    private get_catalog: lambda_js.NodejsFunction;
    private get_all_activities_enrolled: lambda_js.NodejsFunction;

    public functions_need_s3_access: lambda.Function[] = [];
    public function_need_event_bridge_access: lambda.Function[] = [];
    public functions_need_event_bridge_access: lambda.Function[] = [];

    private create_lambda(
        function_name: string,
        environment_variables: { [key: string]: string },
        method: string,
        restapi_resource: apigw.Resource,
        origins: string[] = apigw.Cors.ALL_ORIGINS,
    ) {

        function toTittle(string: string) {
            return string.toLowerCase().split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join("_");
        }

        let function_lambda: lambda.Function;

        function_lambda = new lambda_js.NodejsFunction(
            this,
            toTittle(function_name + "_coil"),
            {
                functionName: toTittle(function_name + "_coil"),
                entry: `../src/modules/${function_name}/app/${function_name}_presenter.ts`,
                handler: `handler`,
                environment: environment_variables,
                runtime: lambda.Runtime.NODEJS_20_X,
                timeout: Duration.seconds(15),
                memorySize: 256
            }
        );

        restapi_resource.addResource(function_name.replace(/_/g, "-"), {
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
        environment_variables: { [key: string]: string },
        restapi_resource: apigw.Resource
    ) {
        super(scope, id);

        let origins = ["*"];

        this.create_moderator = this.create_lambda(
            "create_moderator",
            environment_variables,
            "POST",
            restapi_resource,
            origins
        );

        this.auth_user = this.create_lambda(
            "auth_user",
            environment_variables,
            "GET",
            restapi_resource,
            origins
        );

        this.get_user = this.create_lambda(
            "get_user",
            environment_variables,
            "GET",
            restapi_resource,
            origins
        );

        this.delete_moderator = this.create_lambda(
            "delete_moderator",
            environment_variables,
            "GET",
            restapi_resource,
            origins
        );

        this.create_activity = this.create_lambda(
            "create_activity",
            environment_variables,
            "POST",
            restapi_resource,
            origins
        );

        this.update_activity = this.create_lambda(
            "update_activity",
            environment_variables,
            "POST",
            restapi_resource,
            origins
        );

        this.update_activity_event = new lambda_js.NodejsFunction(
            this,
            "Update_Activity_Event_Coil",
            {
                functionName: "Update_Activity_Event_Coil",
                entry: `../src/modules/update_activity_event/app/update_activity_event_presenter.ts`,
                handler: `handler`,
                environment: environment_variables,
                runtime: lambda.Runtime.NODEJS_20_X,
                timeout: Duration.seconds(15),
                memorySize: 256
            }
        );

        this.create_institution = this.create_lambda(
            "create_institution",
            environment_variables,
            "POST",
            restapi_resource,
            origins
        );

        this.update_institution = this.create_lambda(
            "update_institution",
            environment_variables,
            "POST",
            restapi_resource,
            origins
        );

        this.get_all_activities = this.create_lambda(
            "get_all_activities",
            environment_variables,
            "GET",
            restapi_resource,
            origins
        );

        this.update_users_activity = this.create_lambda(
            "update_users_activity",
            environment_variables,
            "POST",
            restapi_resource,
            origins
        );

        this.assign_user = this.create_lambda(
            "assign_user",
            environment_variables,
            "GET",
            restapi_resource,
            origins
        );

        this.get_all_activities_enrolled = this.create_lambda(
            "get_all_activities_enrolled",
            environment_variables,
            "GET",
            restapi_resource,
            origins
        );

        this.get_all_institutions = this.create_lambda(
            "get_all_institutions",
            environment_variables,
            "GET",
            restapi_resource,
            origins
        );

        this.get_activity = this.create_lambda(
            "get_activity",
            environment_variables,
            "GET",
            restapi_resource,
            origins
        );

        this.get_institution = this.create_lambda(
            "get_institution",
            environment_variables,
            "GET",
            restapi_resource,
            origins
        )

        this.get_activity_requirements = this.create_lambda(
            "get_activity_requirements",
            environment_variables,
            "GET",
            restapi_resource,
            origins
        )

        this.get_institution_requirements = this.create_lambda(
            "get_institution_requirements",
            environment_variables,
            "GET",
            restapi_resource,
            origins
        )

        this.get_catalog = this.create_lambda(
            "get_catalog",
            environment_variables,
            "GET",
            restapi_resource,
            origins
        )

        this.get_all_moderators = this.create_lambda(
            "get_all_moderators",
            environment_variables,
            "GET",
            restapi_resource,
            origins
        )

        this.functions_need_s3_access = [
            this.create_institution,
            this.update_institution,
        ]

        this.functions_need_event_bridge_access = [
            this.create_activity,
            this.update_activity,
            this.update_activity_event,
        ]

        this.functions_need_event_bridge_access.forEach((function_lambda) => {
            function_lambda.addToRolePolicy(
                new iam.PolicyStatement({
                    actions: [
                        "events:PutRule",
                        "events:PutTargets",
                        "events:RemoveTargets",
                        "events:DeleteRule",
                    ],
                    resources: ["*"],
                }))
            function_lambda.addPermission("EventBridgePermission", {
                principal: new iam.ServicePrincipal("events.amazonaws.com"),
                sourceArn: "arn:aws:events:us-east-1:123456789012:rule/*",
                action: "lambda:InvokeFunction",
            });
        });
    }
}
