// routes/auth.js
const express = require('express')
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const path = require('path');
const hbs = require('nodemailer-express-handlebars');
const keys = require('../config/key');
const User = require('../models/userModel');
const { authenticateJWT } = require('../middleware/fetchUser');

const router = express.Router();
const saltrounds = 10;


const transporter = nodemailer.createTransport({
  
    service: 'gmail',
    auth:{
        user: '2710kklyani@gmail.com',
        pass: 'lhvyxjjyzjcncngh'
    }
    });
    
    
    const handlebarOptions = {
      viewEngine: {
        partialsDir: path.resolve('./views/'),
        defaultLayout: false,
      },
      viewPath: path.resolve('./backend/views'),
    };
    
    transporter.use('compile', hbs(handlebarOptions));
    
    const sendWelcomeEmail = (user) => {
      const mailOptions = {
        from: '"Kalyani Kolte" <2710kkalyani@gmail.com>',
        to: user.email,
        subject: 'Welcome to Permissy!!',
        template: 'hello',
        context: {
          name: user.name,
        },
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log('Message sent: ' + info.response);
        }
      });
    };
    
    const sendUserCreatedEmail = (user) => {
      const mailOptions = {
        from: '"Kalyani Kolte" <2710kkalyani@gmail.com>',
        to: user.email,
        subject: 'New Account Created!!',
        template: 'userCreated',
        context: {
          name: user.name,
          username: user.username,
          des: user.designation,
        },
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log('Message sent: ' + info.response);
        }
      });
    };
    
     
// Register route
router.post('/signup', async (req, res) => {    
  try {
    const { name, phone, username, role, email, password} = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    console.log(password + " here it is")

    const salt = await bcrypt.genSalt(saltrounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        name, 
        phone,
        username,
        role,
        email,
      password: hashedPassword,
    });

    console.log("new user is " + newUser);

    await newUser.save();
    sendUserCreatedEmail(newUser);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// login api for user authentication
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    const token = jwt.sign(payload, keys.secretOrKey, { expiresIn: '1h' });

    res.json( { payload, token } );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;