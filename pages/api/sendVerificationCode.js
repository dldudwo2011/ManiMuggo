import AWS from 'aws-sdk';

AWS.config.update({ region: 'us-east-2' });

const sns = new AWS.SNS();
const dynamodb = new AWS.DynamoDB.DocumentClient();

export default async (req, res) => {
  try {
    const { phone } = req.body;
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Send the verification code via SNS
    await sns.publish({
      Message: `Your verification code is ${verificationCode}`,
      PhoneNumber: phone,
    }).promise();

    // Store the verification code in DynamoDB
    await dynamodb.put({
      TableName: 'VerificationCodes',
      Item: {
        phone: phone.toString(), // Ensure phone is a string
        code: verificationCode,
        ttl: Math.floor(Date.now() / 1000) + 300 // TTL set to 5 minutes
      }
    }).promise();

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending verification code:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
      stack: error.stack,
    });
  }
};





