import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

dotenv.config();

export class DatabaseMain {
    public project_table: string;
    public rd_client: Sequelize;
    public dynamo_dbclient: DynamoDBClient;

    constructor() {
        if (process.env.STAG === 'dev') {
            const env_vars = [
                'RDS_HOSTNAME',
                'RDS_PORT',
                'RDS_DB_NAME',
                'RDS_USERNAME',
                'RDS_PASSWORD',
                'RDS_DIALECT',
                'PROJECT_TABLE',
                'AWS_REGION'
            ];
            // Check if all environment variables are set
            for (let env_var of env_vars) {
                if (!process.env[env_var]) {
                    throw new Error(`Missing ${env_var} environment variable.`);
                }
            }
        }

        const dialect: 'mysql' | 'mariadb' | 'postgres' | 'mssql' | 'sqlite' = process.env.RDS_DIALECT as any;
        this.project_table = process.env.PROJECT_TABLE as string;
        this.rd_client = new Sequelize({
            dialect: dialect,
            host: process.env.RDS_HOSTNAME,
            port: Number(process.env.RDS_PORT),
            username: process.env.RDS_USERNAME,
            password: process.env.RDS_PASSWORD,
            database: process.env.RDS_DB_NAME,
        })
        this.dynamo_dbclient = new DynamoDBClient({region: process.env.AWS_REGION});
    }
}