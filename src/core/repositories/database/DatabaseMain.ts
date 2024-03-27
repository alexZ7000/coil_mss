import { PrismaClient } from '@prisma/client';

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';


export class DatabaseMain {
    public project_table: string;
    public rd_client: PrismaClient;
    public dynamo_dbclient: DynamoDBClient;

    constructor() {
        this.project_table = process.env.PROJECT_TABLE as string;
        this.rd_client = new PrismaClient();
        this.dynamo_dbclient = new DynamoDBClient({region: process.env.AWS_REGION});
    }
}