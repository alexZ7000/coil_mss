import dotenv from 'dotenv';
import mysql2 from 'mysql2';
import { Sequelize } from 'sequelize';


dotenv.config();

export class DatabaseMain {
    public rd_client: Sequelize;

    constructor() {
        this.rd_client = new Sequelize({
            dialect: `mysql`,
            dialectModule: mysql2,
            host: process.env.RDS_HOSTNAME,
            port: Number(process.env.RDS_PORT),
            username: process.env.RDS_USERNAME,
            password: process.env.RDS_PASSWORD,
            database: process.env.RDS_DB_NAME,
        })
    }
}