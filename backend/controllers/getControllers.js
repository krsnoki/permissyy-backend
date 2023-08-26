const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const nodemailer = require('nodemailer');
const path = require('path');
const hbs = require('nodemailer-express-handlebars');
const User = require('../models/userModel'); // Import User model

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '2710kklyani@gmail.com',
    pass: 'lhvyxjjyzjcncngh',
  },
});

// Configure handlebars for email templates
const handlebarOptions = {
  viewEngine: {
    partialsDir: path.resolve('./views/'),
    defaultLayout: false,
  },
  viewPath: path.resolve('./backend/views'),
};
transporter.use('compile', hbs(handlebarOptions));

// Send a welcome email to the user
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
      console.log('Welcome email sent: ' + info.response);
    }
  });
};

// Send a user created email
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
      console.log('User created email sent: ' + info.response);
    }
  });
};

// Send a user deleted email
const sendUserDeletedEmail = (user) => {
  const mailOptions = {
    from: '"Kalyani Kolte" <2710kkalyani@gmail.com>',
    to: user.email,
    subject: 'Attention User Deleted!',
    template: 'userDelete',
    context: {
      name: user.name,
    },
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('User deleted email sent: ' + info.response);
    }
  });
};

// Route: GET /api/users/getUsers
router.get('/getUsers', asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
}));

// Route: POST /api/users/createUser
router.post('/createUser', asyncHandler(async (req, res) => {
  const { name, phone, username, designation, email, password } = req.body;

  const user = await User.create({
    name,
    phone,
    username,
    designation,
    email,
    password,
  }); 

  sendUserCreatedEmail(user);

  res.status(200).json(user);
}));

// Route: GET /api/users/searchUser
router.get('/searchUser', asyncHandler(async (req, res) => {
  const { username } = req.query;

  const users = await User.find({ username });

  if (!users.length) {
    res.status(404).send('No user found!');
  } else {
    res.status(200).json(users);
  }
}));

// Route: GET /api/users/getUser
router.get('/getUser', asyncHandler(async (req, res) => {
  const { username } = req.query;

  const user = await User.findOne({ username });

  if (!user) {
    res.status(404).send('No user found!');
  } else {
    res.status(200).json(user);
  }
}));

// Route: DELETE /api/users/deleteUser
router.delete('/deleteUser', asyncHandler(async (req, res) => {
  const { _id } = req.query;

  const user = await User.findByIdAndDelete(_id);

  if (!user) {
    res.status(404).send('No user found');
  } else {
    sendUserDeletedEmail(user);
    res.status(200).json(user);
  }
}));

// Route: PUT /api/users/updateUser
router.put('/updateUser', asyncHandler(async (req, res) => {
  const { _id, name, phone, username, designation, email } = req.body;

  const user = await User.findByIdAndUpdate(
    _id,
    {
      name,
      phone,
      username,
      designation,
      email,
    },
    { new: true }
  );

  if (!user) {
    res.status(404).send('No user found');
  } else {
    res.status(200).send('User updated');
  }
}));

router.get('/findUser', asyncHandler(async (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Username parameter is required' });
  }

  try {
    const users = await User.find({ username });

    if (users.length === 0) {
      return res.status(404).json({ message: 'No user found!' });
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while searching for users' });
  }
}));
module.exports = router;
