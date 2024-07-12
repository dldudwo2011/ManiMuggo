import formidable from 'formidable-serverless';
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  region: 'us-east-2',
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadMenu = async (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err);
      return res.status(500).send('Error parsing form');
    }

    const file = files.menu;
    const params = {
      Bucket: 'your-s3-bucket-name',
      Key: `menus/${file.name}`,
      Body: file,
      ContentType: file.type,
    };

    try {
      const data = await s3.upload(params).promise();
      res.status(200).json({ url: data.Location });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).send('Error uploading file');
    }
  });
};

export default uploadMenu;