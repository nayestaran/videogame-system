import { Domain } from './domain';
import { Event, Handler, HandlerOutput } from './handler';
import { AwsDynamoDB } from './data/aws-dynamodb';

type LambdaEnvironment = {
  DYNAMODB_TABLE_NAME: string;
};

const {
  DYNAMODB_TABLE_NAME
} = process.env as LambdaEnvironment;

const awsDynamoDB = new AwsDynamoDB(DYNAMODB_TABLE_NAME);
const domain = new Domain({
  awsDynamoDB
});
const handler = new Handler(domain);

export const insertVideogameAdminHandler = async (event: Event): Promise<HandlerOutput> => handler.execute(event);
