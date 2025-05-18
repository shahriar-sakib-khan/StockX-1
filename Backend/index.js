const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const app = express();

const authController = require('./controllers/authController')
const uploadController = require('./controllers/uploadController');
const userController = require("./controllers/userController");
const commentController = require("./controllers/commentController");

// db connecting
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URL);

// middlewares
app.use(cors());
app.use(express.json());

app.use("/auth", authController);
app.use('/upload', uploadController)
app.use('/user', userController)
app.use('/comment', commentController)

// starting server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server has been started"));