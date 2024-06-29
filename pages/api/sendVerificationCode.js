import AWS from 'aws-sdk';

AWS.config.update({ region: process.env.AWS_REGION });

const sns = new AWS.SNS();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let { phone } = req.body;
    
    // Ensure the phone number is a string and formatted correctly
    phone = String(phone).startsWith('+1') ? String(phone) : `+1${String(phone)}`;
    
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    const params = {
      Message: `Your verification code is ${verificationCode}`,
      PhoneNumber: phone,
      MessageAttributes: {
        'SenderID': {
          'DataType': 'String',
          'StringValue': 'MyAppName'
        },
        'SMSType': {
          'DataType': 'String',
          'StringValue': 'Transactional'
        },
        'OriginationNumber': {
          'DataType': 'String',
          'StringValue': '+12362017636' // Your Canadian origination number
        }
      }
    };

    try {
      console.log('AWS_REGION:', process.env.AWS_REGION);
      console.log('AWS_ACCESS_KEY_ID:', process.env.AWS_ACCESS_KEY_ID);
      console.log('AWS_SECRET_ACCESS_KEY:', process.env.AWS_SECRET_ACCESS_KEY);
      console.log('Sending SMS with params:', params);

      const data = await sns.publish(params).promise();
      console.log('Message sent, ID:', data.MessageId);
      res.status(200).json({ success: true, verificationCode });
    } catch (error) {
      console.error('Error sending verification code:', error, error.stack); // Detailed error log
      res.status(500).json({ 
        success: false, 
        error: error.message, 
        stack: error.stack, 
        code: error.code, 
        requestId: error.requestId,
        rawError: error // Include the raw error object for detailed debugging
      });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}



