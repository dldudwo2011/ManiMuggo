import { promises as fs } from 'fs';
import path from 'path';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { verification } = req.body;

    // Save verification status to a file or a database
    const filePath = path.join(process.cwd(), 'verification-status.json');
    await fs.writeFile(filePath, JSON.stringify(verification, null, 2));

    res.status(200).json({ status: 'success' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default handler;
