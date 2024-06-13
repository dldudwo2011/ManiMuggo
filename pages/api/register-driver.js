import multer from 'multer';
import { uploadFile, sendVerificationCode } from '../../lib/aws';
import prisma from '../../lib/prisma';

const upload = multer({ storage: multer.memoryStorage() });

export const config = {
  api: {
    bodyParser: false,
  },
};

const isValidLicense = (textDetections) => {
    let dateOfBirth, licenseId;
  
    textDetections.forEach(detection => {
      if (detection.Type === 'LINE') {
        // Extract date of birth
        if (detection.DetectedText.match(/DOB/)) {
          dateOfBirth = detection.DetectedText.replace('DOB', '').trim();
        }
        // Extract license ID
        if (detection.DetectedText.match(/ID/)) {
          licenseId = detection.DetectedText.replace('ID', '').trim();
        }
      }
    });
  
    // Check if the date of birth is valid and the user is older than 18
    if (dateOfBirth) {
      const birthDate = new Date(dateOfBirth);
      const age = new Date().getFullYear() - birthDate.getFullYear();
      if (age < 18) {
        return false;
      }
    }
  
    // Validate license ID format (assuming a simple length check)
    if (licenseId && licenseId.length === 9) {
      return true;
    }
  
    return false;
  };

  export default async function handler(req, res) {
    if (req.method === 'POST') {
      upload.fields([{ name: 'photo' }, { name: 'license' }])(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to upload files' });
        }
  
        const { vehicleType, licenseNumber, city, phone } = req.body;
  
        let photoUrl, licensePhotoUrl;
  
        if (req.files.photo) {
          const photoUploadResult = await uploadFile(req.files.photo[0]);
          photoUrl = photoUploadResult.Location;
        }
  
        if (req.files.license) {
          const licenseUploadResult = await uploadFile(req.files.license[0]);
          licensePhotoUrl = licenseUploadResult.Location;
  
          // Extract text from the license image
          const textDetections = await extractTextFromImage(process.env.AWS_S3_BUCKET, licenseUploadResult.Key);
  
          // Validate the driver's license
          if (!isValidLicense(textDetections)) {
            return res.status(400).json({ error: 'Invalid driver license or underage driver' });
          }
        }
  
        try {
          const newDriver = await prisma.deliveryDriver.create({
            data: {
              vehicleType,
              licenseNumber,
              city,
              phone,
              photoUrl,
              licensePhotoUrl,
            },
          });
  
          const verificationCode = await sendVerificationCode(phone);
          // Store the verification code in the session or database for later verification
          // For simplicity, we store it in memory here
          req.session.verificationCode = verificationCode;
  
          res.status(200).json(newDriver);
        } catch (error) {
          res.status(500).json({ error: 'Error creating delivery driver' });
        }
      });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
}

