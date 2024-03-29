import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';


dotenv.config();

export class DatabaseMain {
    public project_table: string;
    public rd_client: Sequelize;
    public dynamo_dbclient: DynamoDBClient;

    constructor() {
        this.project_table = process.env.PROJECT_TABLE as string;
        this.rd_client = new Sequelize({
            dialect: `mysql`,
            host: process.env.RDS_HOSTNAME,
            port: Number(process.env.RDS_PORT),
            username: process.env.RDS_USERNAME,
            password: process.env.RDS_PASSWORD,
            database: process.env.RDS_DB_NAME,
        })
        this.dynamo_dbclient = new DynamoDBClient({region: process.env.AWS_REGION});
    }
}