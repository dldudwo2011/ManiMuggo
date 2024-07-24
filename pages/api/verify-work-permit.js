import axios from 'axios';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(process.cwd(), 'uploads');
    fs.mkdirSync(uploadPath, { recursive: true }); // Ensure the directory exists
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  if (req.method === 'POST') {
    upload.single('file')(req, res, async (err) => {
      if (err) {
        console.error('Error uploading file:', err);
        return res.status(500).json({ error: 'Error uploading file' });
      }

      const clientAuthToken = process.env.NEXT_PUBLIC_VERIFF_API_KEY;
      const clientSecret = process.env.VERIFF_SHARED_SECRET; 
      const { firstName, lastName, documentType } = req.body;

      if(documentType === "RESIDENCE_PERMIT")
        {
            const verificationRequestData = {
                verification: {
                  callback: 'https://www.manimuggo.com', // Ensure this is a valid URL
                  person: {
                    firstName,
                    lastName,
                  },
                  document: {
                    type: 'RESIDENCE_PERMIT',
                    country: 'CA', // Update country code as per requirement
                  },
                },
              };

              console.log('Request body:', req.body);
              console.log('File:', req.file);
              console.log('Client Auth Token:', clientAuthToken);
        
              const requestDataString = JSON.stringify(verificationRequestData);
        
              console.log('Request Data String:', requestDataString);
              console.log('Client Secret:', clientSecret);

              try {
                // Generate HMAC signature for the session creation request
                const sessionHmacSignature = crypto
                  .createHmac('sha256', clientSecret)
                  .update(requestDataString)
                  .digest('hex');
        
                console.log('Session HMAC Signature:', sessionHmacSignature);
        
                // Create Veriff session
                const response = await axios.post(
                  'https://stationapi.veriff.com/v1/sessions',
                  verificationRequestData,
                  {
                    headers: {
                      'Content-Type': 'application/json',
                      'X-AUTH-CLIENT': clientAuthToken,
                      'X-HMAC-SIGNATURE': sessionHmacSignature,
                    },
                  }
                );
        
                console.log('Veriff response:', response.data);
        
                const sessionData = response.data;
                const { verification } = sessionData;
                const sessionId = verification.id;
        
                // Convert the file to base64
                const fileBuffer = fs.readFileSync(req.file.path);
                const base64File = fileBuffer.toString('base64');
        
                // Create JSON payload
                const imageRequestData = {
                  image: {
                    context: 'document-front',
                    content: base64File,
                  },
                };
        
                const imageRequestDataString = JSON.stringify(imageRequestData);
        
                // Generate HMAC signature for the image upload request
                const uploadHmacSignature = crypto
                  .createHmac('sha256', clientSecret)
                  .update(imageRequestDataString)
                  .digest('hex');
        
                console.log('Session ID:', sessionId);
                console.log('Image Request Data String:', imageRequestDataString);
                console.log('Upload HMAC Signature:', uploadHmacSignature);
        
                await axios.post(
                  `https://stationapi.veriff.com/v1/sessions/${sessionId}/media`,
                  imageRequestData,
                  {
                    headers: {
                      'Content-Type': 'application/json',
                      'X-AUTH-CLIENT': clientAuthToken,
                      'X-HMAC-SIGNATURE': uploadHmacSignature,
                    },
                  }
                );
        
                fs.unlinkSync(req.file.path); // Remove the file from server after upload
        
                res.status(200).json({ verificationUrl: verification.url });
              } catch (error) {
                console.error(
                  'Error creating Veriff session:',
                  error.response ? error.response.data : error.message
                );
                res.status(500).json({ error: error.response ? error.response.data : error.message });
              }
        
        }

        if(documentType === "VISA")
        {
            const verificationRequestData = {
                verification: {
                  callback: 'https://www.manimuggo.com', // Ensure this is a valid URL
                  person: {
                    firstName,
                    lastName,
                  },
                  document: {
                    type: 'VISA',
                    country: 'CA', // Update country code as per requirement
                  },
                },
              };

              console.log('Request body:', req.body);
              console.log('File:', req.file);
              console.log('Client Auth Token:', clientAuthToken);
        
              const requestDataString = JSON.stringify(verificationRequestData);
        
              console.log('Request Data String:', requestDataString);
              console.log('Client Secret:', clientSecret);

              try {
                // Generate HMAC signature for the session creation request
                const sessionHmacSignature = crypto
                  .createHmac('sha256', clientSecret)
                  .update(requestDataString)
                  .digest('hex');
        
                console.log('Session HMAC Signature:', sessionHmacSignature);
        
                // Create Veriff session
                const response = await axios.post(
                  'https://stationapi.veriff.com/v1/sessions',
                  verificationRequestData,
                  {
                    headers: {
                      'Content-Type': 'application/json',
                      'X-AUTH-CLIENT': clientAuthToken,
                      'X-HMAC-SIGNATURE': sessionHmacSignature,
                    },
                  }
                );
        
                console.log('Veriff response:', response.data);
        
                const sessionData = response.data;
                const { verification } = sessionData;
                const sessionId = verification.id;
        
                // Convert the file to base64
                const fileBuffer = fs.readFileSync(req.file.path);
                const base64File = fileBuffer.toString('base64');
        
                // Create JSON payload
                const imageRequestData = {
                  image: {
                    context: 'document-front',
                    content: base64File,
                  },
                };
        
                const imageRequestDataString = JSON.stringify(imageRequestData);
        
                // Generate HMAC signature for the image upload request
                const uploadHmacSignature = crypto
                  .createHmac('sha256', clientSecret)
                  .update(imageRequestDataString)
                  .digest('hex');
        
                console.log('Session ID:', sessionId);
                console.log('Image Request Data String:', imageRequestDataString);
                console.log('Upload HMAC Signature:', uploadHmacSignature);
        
                await axios.post(
                  `https://stationapi.veriff.com/v1/sessions/${sessionId}/media`,
                  imageRequestData,
                  {
                    headers: {
                      'Content-Type': 'application/json',
                      'X-AUTH-CLIENT': clientAuthToken,
                      'X-HMAC-SIGNATURE': uploadHmacSignature,
                    },
                  }
                );
        
                fs.unlinkSync(req.file.path); // Remove the file from server after upload
        
                res.status(200).json({ verificationUrl: verification.url });
              } catch (error) {
                console.error(
                  'Error creating Veriff session:',
                  error.response ? error.response.data : error.message
                );
                res.status(500).json({ error: error.response ? error.response.data : error.message });
              }
        
        }
 
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default handler;


