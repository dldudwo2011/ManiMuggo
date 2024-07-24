import AWS from 'aws-sdk';

const isLocal = process.env.NODE_ENV === 'development'; // Assuming you're using NODE_ENV to distinguish between environments

// Configure AWS SDK for local DynamoDB
if (isLocal) {
  AWS.config.update({
    region: 'us-east-2',
    endpoint: 'http://localhost:8000', // DynamoDB Local endpoint
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Dummy credentials for DynamoDB Local
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Dummy credentials for DynamoDB Local
  });
} else {
  AWS.config.update({
    region: 'us-east-2',
  });
}

const dynamodb = new AWS.DynamoDB.DocumentClient();

export { dynamodb };
