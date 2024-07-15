// pages/api/create-veriff-session.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const response = await axios.post('https://stationapi.veriff.com/v1/sessions', {
        verification: {
          callback: `${process.env.NEXT_PUBLIC_APP_URL}/api/veriff-callback`
        }
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.VERIFF_API_KEY}` // Replace with your Veriff API key
        }
      });

      res.status(200).json({
        veriffSessionUrl: response.data.verification.url
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error creating Veriff session');
    }
  } else {
    res.status(405).send('Method not allowed');
  }
}
