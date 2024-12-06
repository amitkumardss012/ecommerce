import fs from 'fs';
import path from 'path';
import { promises as fsPromises } from 'fs';
import { Request } from 'express';

interface ImageObject {
  url: string;
}

export const handleImages = (currentImages: ImageObject[], newImages: Express.Multer.File[]): ImageObject[] => {
  currentImages.forEach((image) => {
    const imagePath = path.join(__dirname, '../..', image.url);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  });


  const imageObjects = newImages.map((image) => ({
    url: `/uploads/${image.filename}`,
  }));

  return imageObjects;
};

export const deleteImages = (imageUrls: string[]): void => {
    imageUrls.forEach((imageUrl) => {
      const imagePath = path.join(__dirname, '../..', imageUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    });
  };

  export interface FileRequest extends Request {
    files?: Express.Multer.File[];
  }

  export const fileCleanup = async (req: Request) => {
    if (req.files) {
      const files = req.files as Express.Multer.File[];
      const unlinkPromises = files.map((file) => {
        const filePath = path.resolve(file.path);
        return fsPromises.unlink(filePath).catch(err => {
          console.error(`Failed to delete file: ${filePath}`, err);
        });
      });
      await Promise.all(unlinkPromises);
    }
  };
  
