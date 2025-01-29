import path from "path";
import multer, { FileFilterCallback, StorageEngine } from "multer";
import { Request } from "express";

const multerStorage = (pathname: string): StorageEngine => {
  const storage = multer.diskStorage({
    destination: (
      req: Request,
      file: Express.Multer.File,
      cb: (error: Error | null, destination: string) => void
    ) => {
      cb(null, path.join(__dirname, pathname));
    },
    filename: (
      req: Request,
      file: Express.Multer.File,
      cb: (error: Error | null, filename: string) => void
    ) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  return storage;
};

export const upload = (pathname: string) => {
  return multer({
    storage: multerStorage(pathname),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (
      req: Request,
      file: Express.Multer.File,
      cb: FileFilterCallback
    ) => {
      const fileTypes = /jpeg|jpg|png|gif/;
      const mimeType = fileTypes.test(file.mimetype);
      const extName = fileTypes.test(
        path.extname(file.originalname).toLocaleLowerCase()
      );
      if (mimeType && extName) {
        return cb(null, true);
      }
      cb(new Error("Only image files are allowed!"));
    },
  });
};
