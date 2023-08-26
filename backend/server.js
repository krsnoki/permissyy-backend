const express = require('express');

const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');

const nodemailer = require('nodemailer');
const connectDB = require('./config/db');

const { errorHandler } = require('./middleware/errorMiddleware');

const passport = require('passport');
const passportJwt = require('passport-jwt');


const keys = require('./config/key');

// Import routes
const authRoutes = require('./routes/auth'); 
const userRoutes = require('./routes/userRoutes')

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to the database
connectDB();

// Use authentication routes
app.use('/auth', authRoutes);
app.use('/', userRoutes);

app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
