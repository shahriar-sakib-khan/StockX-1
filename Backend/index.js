const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const app = express()

// Connecting to databse(Mongodb)
mongoose.connect(process.env.MONGO_URL, console.log("Database connected successfully"))

// Starting server
app.listen(process.env.PORT, console.log("Server has been started successfully"))

