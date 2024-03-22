import { IProjectRepo } from '../interfaces/IProjectRepo';

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';


export class ProjectRepo implements IProjectRepo {
    private DynamoDBClient: DynamoDBClient;
    constructor() {
        this.DynamoDBClient = new DynamoDBClient({region: process.env.AWS_REGION});
    }
    
}