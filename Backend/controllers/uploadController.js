import { Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

// Ensure 'public/images' directory exists
const imageDir = path.resolve('public/images');
if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, imageDir);
    },
    filename: (req, file, cb) => {
        cb(null, req.body.filename);
    },
});

const upload = multer({ storage });

// Handler for uploading a single image
const uploadImage = async (req, res) => {
    try {
        return res.status(200).json("File uploaded successfully");
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

// Create and export router
const uploadRouter = Router();
uploadRouter.post('/image', upload.single('image'), uploadImage);

export default uploadRouter;
