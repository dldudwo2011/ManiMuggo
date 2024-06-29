import AWS from 'aws-sdk';

AWS.config.update({ region: 'us-east-1' });

const sns = new AWS.SNS();

export default async (req, res) => {
  try {
    const { phone, code } = req.body;

    // Add your actual verification logic here
    // For demonstration, I'm using a placeholder logic
    const storedCode = '123456'; // This should be fetched from your database or cache

    if (code === storedCode) {
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
