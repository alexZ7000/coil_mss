import dotenv from 'dotenv';
import { EventBridge, Lambda } from 'aws-sdk';

dotenv.config();


export class EventBridgeManager {
    private event: EventBridge;
    private lambda: Lambda;
    private aws_region: string;
    private aws_account_id: string;

    constructor() {
        this.event = new EventBridge();
        this.lambda = new Lambda();
        this.aws_region = process.env.AWS_REGION as string;
        this.aws_account_id = process.env.AWS_ACCOUNT_ID as string;
    }

    private async get_rule(rule_name: string): Promise<any | undefined> {
        return await this.event.describeRule({
            Name: rule_name,
        }).promise();
    }

    public async create_trigger(rule_name: string, lambda_function: string, date: Date, payload: any) {
        lambda_function = lambda_function + "_Coil";

        // Remove existing permission
        await this.lambda.removePermission({
            FunctionName: lambda_function,
            StatementId: rule_name,
        }).promise().catch(error => {
            console.log('Error removing permission:', error);
        });

        // Get Lambda function ARN
        const lambda_response = await this.lambda.getFunction({
            FunctionName: lambda_function,
        }).promise();
        const lambda_arn = lambda_response.Configuration?.FunctionArn as string;

        // Add permission
        await this.lambda.addPermission({
            Action: "lambda:InvokeFunction",
            FunctionName: lambda_function,
            Principal: "events.amazonaws.com",
            StatementId: rule_name,
            SourceArn: "arn:aws:events:" + this.aws_region + ":" + this.aws_account_id + ":rule/" + rule_name,
        }).promise();

        // Create CloudWatch Events rule
        await this.event.putRule({
            Name: rule_name,
            ScheduleExpression: "cron(" + date.getMinutes() + " " + date.getHours() + " " + date.getDate() + " " + (date.getMonth() + 1) + " ? " + date.getFullYear() + ")",
            State: "ENABLED"
        }).promise();

        // Add target to the rule
        await this.event.putTargets({
            Rule: rule_name,
            Targets: [
                {
                    Id: rule_name,
                    Arn: lambda_arn,
                    InputTransformer: {
                        InputPathsMap: {
                            "body": "$.body",
                        },
                        InputTemplate: JSON.stringify(payload),
                    },
                },
            ],
        }).promise();
    }

    public async delete_trigger(rule_name: string, lambda_function: string): Promise<boolean> {
        const has_rule = await this.get_rule(rule_name);
        lambda_function = lambda_function + "_Coil";
    
        if (has_rule) {
            await this.lambda.removePermission({
                FunctionName: lambda_function,
                StatementId: rule_name,
            }).promise();
    
            await this.event.removeTargets({
                Rule: rule_name,
                Ids: [rule_name],
            }).promise();
    
            await this.event.deleteRule({
                Name: rule_name,
            }).promise();
    
            return true;
        } else {
            return true;
        }
    }
}