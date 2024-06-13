import { uploadFile } from '../../lib/aws';
import prisma from '../../lib/prisma';
import multer from 'multer';

const upload = multer({
  storage: multer.memoryStorage(),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const uploadMiddleware =
    upload.single('file');

    uploadMiddleware(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to upload file' });
      }

      try {
        const file = req.file;
        const result = await uploadFile(file);
        const imageUrl = result.Location;

        // Assuming you have some logic to determine which entity the image is for
        // and you pass the relevant id and type in the request body
        const { entityId, entityType } = req.body;

        let updatedEntity;

        if (entityType === 'restaurantBanner') {
          updatedEntity = await prisma.restaurant.update({
            where: { id: parseInt(entityId) },
            data: { bannerUrl: imageUrl },
          });
        } else if (entityType === 'restaurantProfile') {
          updatedEntity = await prisma.restaurant.update({
            where: { id: parseInt(entityId) },
            data: { profilePhotoUrl: imageUrl },
          });
        } else if (entityType === 'menuItem') {
          updatedEntity = await prisma.menuItem.update({
            where: { id: parseInt(entityId) },
            data: { imageUrl: imageUrl },
          });
        }

        res.status(200).json(updatedEntity);
      } catch (error) {
        res.status(500).json({ error: 'Error updating entity with image URL' });
      }
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

