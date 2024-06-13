import multer from 'multer';
import { uploadFile } from '../../lib/aws';
import prisma from '../../lib/prisma';

const upload = multer({ storage: multer.memoryStorage() });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    upload.fields([{ name: 'banner' }, { name: 'profile' }])(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to upload files' });
      }

      const {
        name,
        address,
        phone,
        ownerId,
        description,
      } = req.body;

      let bannerUrl, profilePhotoUrl;

      if (req.files.banner) {
        const bannerUploadResult = await uploadFile(req.files.banner[0]);
        bannerUrl = bannerUploadResult.Location;
      }

      if (req.files.profile) {
        const profileUploadResult = await uploadFile(req.files.profile[0]);
        profilePhotoUrl = profileUploadResult.Location;
      }

      try {
        const newRestaurant = await prisma.restaurant.create({
          data: {
            name,
            address,
            phone,
            ownerId: parseInt(ownerId, 10),
            description,
            bannerUrl,
            profilePhotoUrl,
          },
        });

        res.status(200).json(newRestaurant);
      } catch (error) {
        res.status(500).json({ error: 'Error creating restaurant' });
      }
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
