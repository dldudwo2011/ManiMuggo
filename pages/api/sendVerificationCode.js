import AWS from 'aws-sdk';
import { dynamodb } from '../../lib/dynamodb-local';

const sns = new AWS.SNS();

export default async (req, res) => {
  try {
    const { phone } = req.body;
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Replace 'YourSenderID' with your actual sender ID or origination number
    const senderId = '+12362017636';  // Must be an alphanumeric string of up to 11 characters or an origination number

    // Enhanced logging for debugging
    console.log('Sending verification code:', verificationCode, 'to phone number:', phone, 'from', senderId);

    // Send the verification code via SNS
    await sns.publish({
      Message: `Your verification code is ${verificationCode}`,
      PhoneNumber: phone,
      MessageAttributes: {
        'AWS.SNS.SMS.SenderID': {
          DataType: 'String',
          StringValue: senderId
        }
      }
    }).promise();

    // Enhanced logging for debugging
    console.log('Verification code sent successfully to', phone);

    // Store the verification code in DynamoDB
    await dynamodb.put({
      TableName: 'VerificationCodes',
      Item: {
        phone: phone.toString(), // Ensure phone is a string
        code: verificationCode,
        ttl: Math.floor(Date.now() / 1000) + 300, // TTL set to 5 minutes
      },
    }).promise();

    // Enhanced logging for debugging
    console.log('Verification code stored in DynamoDB for phone number:', phone);

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






