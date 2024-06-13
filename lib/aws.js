import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const uploadFile = (file) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: `${Date.now()}_${file.originalname}`,
    Body: file.buffer,
    ACL: 'public-read',
  };

  return s3.upload(params).promise();
};

const rekognition = new AWS.Rekognition({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });
  
const sns = new AWS.SNS({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const extractTextFromImage = async (s3Bucket, s3Key) => {
    const params = {
      Image: {
        S3Object: {
          Bucket: s3Bucket,
          Name: s3Key,
        },
      },
    };
  
    const response = await rekognition.detectText(params).promise();
    return response.TextDetections;
  };
  
export const sendVerificationCode = async (phoneNumber) => {
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  const params = {
    Message: `Your verification code is: ${verificationCode}`,
    PhoneNumber: phoneNumber,
  };
  
  await sns.publish(params).promise();
  return verificationCode;
};

