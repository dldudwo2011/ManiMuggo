import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const response = await axios.post(
        'https://stationapi.veriff.com/v1/sessions',
        {
          verification: {
            callback: 'https://yourdomain.com/api/veriff-callback',
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-AUTH-CLIENT': process.env.VERIFF_API_KEY,
          },
        }
      );
      res.status(200).json({ veriffSessionUrl: response.data.verification.url });
    } catch (error) {
      console.error('Error creating Veriff session:', error);
      res.status(500).json({ message: 'Error creating Veriff session', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}


