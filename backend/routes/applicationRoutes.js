const express = require('express');
const moment = require('moment');

const router = express.Router();

const asyncHandler = require('express-async-handler')

//importing schema model
const User = require('../models/userModel')
const Application = require('../models/applicationModel')
const { default: mongoose } = require('mongoose')

// Route: GET /api/users/getUsers
router.get('/getApps', asyncHandler(async (req, res) => {
  const { status } = req.query;

  let query = {}; // Default query

  if (status) {
    query.status = status; // Add status to query if provided
  }

  const applications = await Application.find(query);
  res.status(200).json(applications);
}));



// Route: POST /requests/createApplication


// Route: POST /api/applications/createApplication
router.post('/createApplication', asyncHandler(async (req, res) => { 
  const { applicant, body, recieverId, status } = req.body;

  // Get the current date and time
  const currentDate = moment().format('YYYY-MM-DD'); // Format: 'YYYY-MM-DD'
  const currentTime = moment().format('HH:mm:ss');   // Format: 'HH:mm:ss'

  const application = await Application.create({
    applicant,
    body,
    recieverId,
    status,
    date: currentDate, 
    time: currentTime,
  });

  // Perform any additional actions here, such as sending notifications or emails

  res.status(200).json(application);
}));


// router.post('/createApplication', asyncHandler(async (req, res) => {
//     const {  applicant, body, recieverId, status } = req.body;
  
//     const application = await Application.create({
//       applicant,
//       body,
//       recieverId,
//       status,
//     });
  
//     // Perform any additional actions here, such as sending notifications or emails
  
//     res.status(200).json(application);
//   }));



  module.exports = router;