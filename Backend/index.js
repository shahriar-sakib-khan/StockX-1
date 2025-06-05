import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import authController from './controllers/authController.js';
import uploadController from './controllers/uploadController.js';
import userController from './controllers/userController.js';
import transactionController from './controllers/transactionController.js';


dotenv.config();

const app = express();

// MongoDB connection
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (uploads)
app.use('/images', express.static(path.join('public/images')));

// Routes
app.use("/api/v1/auth", authController);
app.use('/api/v1/upload', uploadController);
app.use('/api/v1/user', userController);
app.use('/api/v1/transaction', transactionController);

// Server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
