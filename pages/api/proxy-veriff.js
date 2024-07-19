import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { sessionUrl, file } = req.body;

    try {
      const response = await axios.post(
        sessionUrl,
        file,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-AUTH-CLIENT': process.env.VERIFF_API_KEY,
          },
        }
      );

      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error uploading file to Veriff:', error);
      res.status(500).json({ message: 'Error uploading file to Veriff', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
