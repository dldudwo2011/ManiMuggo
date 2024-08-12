import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

AWS.config.update({
  region: process.env.AWS_REGION,
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const ses = new AWS.SES({ apiVersion: '2010-12-01' });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, name, type } = req.body;
    const onboardingToken = uuidv4(); // Generate a unique token for the onboarding link

    const onboardingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/onboarding/${onboardingToken}`;

    try {
      // Update the appropriate table entry with the onboarding token while preserving existing attributes
      const tableName = type === 'driver' ? 'Drivers' : 'Restaurants';
      await dynamoDB
        .update({
          TableName: tableName, // Dynamically choose the table
          Key: { email: email }, // Assuming 'email' is the primary key
          UpdateExpression: 'set onboardingToken = :onboardingToken, #status = :status',
          ExpressionAttributeValues: {
            ':onboardingToken': onboardingToken,
            ':status': 'Pending',
          },
          ExpressionAttributeNames: {
            '#status': 'status', // To handle reserved words in DynamoDB
          },
        })
        .promise();

      // Send the email using AWS SES
      const params = {
        Destination: {
          ToAddresses: [email],
        },
        Message: {
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data: `
                <p>Hello ${name},</p>
                <p>Welcome to Manimuggo! To complete your onboarding process, please click the link below:</p>
                <a href="${onboardingLink}">Complete Onboarding</a>
                <p>If you did not apply to become a ${type}, please ignore this email.</p>
                <p>Best regards,<br>The Manimuggo Team</p>
              `,
            },
          },
          Subject: {
            Charset: 'UTF-8',
            Data: `Complete Your ${type.charAt(0).toUpperCase() + type.slice(1)} Onboarding Process`,
          },
        },
        Source: 'no-reply@manimuggo.com', // Verified sender email address
      };

      await ses.sendEmail(params).promise();

      res.status(200).json({ message: 'Onboarding email sent successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to send onboarding email' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
