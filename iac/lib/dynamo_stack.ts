import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { aws_dynamodb as dynamodb, CfnOutput } from "aws-cdk-lib";

export class DynamoStack extends Construct {
  project_table: dynamodb.Table;

  constructor(scope: Construct) {
    super(scope, "Coil_DynamoDB_Stack");

    this.project_table = new dynamodb.Table(this, "CoilProjectTable", {
      partitionKey: { name: "PK", type: dynamodb.AttributeType.STRING },
      sortKey: { name: "SK", type: dynamodb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    this.project_table.addGlobalSecondaryIndex({
      indexName: "GSI1",
      partitionKey: { name: "SK", type: dynamodb.AttributeType.STRING },
      sortKey: { name: "PK", type: dynamodb.AttributeType.STRING },
    });

    new CfnOutput(this, "ProjectTableName", {
      value: this.project_table.tableName,
    });
  }
}