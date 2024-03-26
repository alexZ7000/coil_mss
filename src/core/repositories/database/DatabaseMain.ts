import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

export class DatabaseMain {
    public dynamo_dbclient: DynamoDBClient;
    public project_table: string;

    constructor() {
        this.project_table = process.env.PROJECT_TABLE as string;
        this.dynamo_dbclient = new DynamoDBClient({region: process.env.AWS_REGION});
    }
}