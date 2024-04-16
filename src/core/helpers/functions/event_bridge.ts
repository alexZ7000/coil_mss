import { EventBridge, Lambda } from 'aws-sdk';

export class EventBridgeManager {
    private event: EventBridge;
    private lambda: Lambda;

    constructor() {
        this.event = new EventBridge();
        this.lambda = new Lambda();
    }

    private async get_rule(rule_name: string): Promise<any | undefined> {
        return await this.event.describeRule({
            Name: rule_name,
        }).promise();
    }

    public async create_trigger(rule_name: string, lambda_function: string, date: Date, payload: any) {
        try {
            lambda_function = lambda_function + "_Coil";

            try {
                this.lambda.removePermission({
                    FunctionName: lambda_function,
                    StatementId: rule_name,
                }).promise();
            } catch (error) {
                console.log('No permission found');
            }

            const lambda_arn = (await this.lambda.getFunction({
                FunctionName: lambda_function,
            }).promise()).Configuration?.FunctionArn as string;

            this.lambda.addPermission({
                FunctionName: lambda_function,
                StatementId: rule_name,
                Action: 'lambda:InvokeFunction',
                Principal: 'events.amazonaws.com',
                SourceArn: (await this.event.putRule({
                    Name: rule_name,
                    ScheduleExpression: `cron(${date.getMinutes()} ${date.getHours()} ${date.getDate()} ${date.getMonth() + 1} ? ${date.getFullYear()})`,
                    State: 'ENABLED',
                }).promise()).RuleArn,
            }).promise();

            this.event.putTargets({
                Rule: rule_name,
                Targets: [
                    {
                        Arn: lambda_arn,
                        Id: rule_name,
                        Input: JSON.stringify(payload),
                    },
                ],
            }).promise();
        } catch (error) {
            throw new Error(error);
        }
    }   

    public async delete_trigger(rule_name: string, lambda_function: string): Promise<boolean> {
        try {
            const has_rule = await this.get_rule(rule_name);
            lambda_function = lambda_function + "_Coil";

            if (has_rule) {
                this.event.removeTargets({
                    Rule: rule_name,
                    Ids: [rule_name],
                }).promise();

                this.event.deleteRule({
                    Name: rule_name,
                }).promise();

                this.lambda.removePermission({
                    FunctionName: lambda_function,
                    StatementId: rule_name,
                }).promise();
                return true;
            } else {
                return true;
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}