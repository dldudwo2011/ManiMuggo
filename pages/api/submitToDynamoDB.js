import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';

const dynamoDbClient = new DynamoDBClient({ region: 'us-east-2' });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { data } = req.body;

    const params = {
      TableName: 'Drivers',
      Item: {
        firstName: { S: data.firstName },
        lastName: { S: data.lastName },
        email: { S: data.email },
        phone: { S: data.phone },
        country: { S: data.country },
        address: { S: data.address },
        licenseNumber: { S: data.licenseNumber },
        vehicleBrand: { S: data.vehicleBrand },
        vehicleType: { S: data.vehicleType },
        vehicleYear: { S: data.vehicleYear.toString() },
        vehicleName: { S: data.vehicleName },
        licensePlate: { S: data.licensePlate },
      },
    };

    try {
      const command = new PutItemCommand(params);
      await dynamoDbClient.send(command);
      res.status(200).json({ message: 'Data uploaded to DynamoDB successfully.' });
    } catch (error) {
      console.error('Error uploading data to DynamoDB:', error);
      res.status(500).json({ error: 'Error uploading data to DynamoDB.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
