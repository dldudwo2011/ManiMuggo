import { dynamodb } from '../../lib/dynamodb-local';


export default async (req, res) => {
  try {
    const { phone, code } = req.body;

    // Fetch the stored code from DynamoDB
    const result = await dynamodb.get({
      TableName: 'VerificationCodes',
      Key: { phone: phone.toString() } // Ensure phone is a string
    }).promise();

    if (result.Item && result.Item.code === code) {
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false, message: 'Invalid verification code' });
    }
  } catch (error) {
    console.error('Error verifying code:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
      stack: error.stack,
    });
  }
};

