import { Router } from 'express';
import multer from 'multer';

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
    cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
    cb(null, req.body.filename);
    },
});

const upload = multer({ storage });

// Handler for uploading a single image
export const uploadImage = async (req, res) => {
    try {
    return res.status(200).json("File uploaded successfully");
    } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
    }
};

// Optional: create the router
export const uploadRouter = Router();

uploadRouter.post('/image', upload.single('image'), uploadImage);
