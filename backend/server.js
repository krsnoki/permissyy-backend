//importing express 
const express = require('express')

//parsing body in json
const bodyParser = require('body-parser')
//dotenv req.
const dotenv = require('dotenv').config() 

//importing colors
const colors = require('colors')

//initialising app
const app = express()



//port from env file currently set to 3000
const port =  process.env.PORT || 3000

//nodemailer package for sending mails
const nodemailer = require('nodemailer')


//connection to db
const connectDB = require('./config/db')
connectDB() //making a call to connection function to primt token

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true}))
const { errorHandler } = require('./middleware/errorMiddleware');


// Render Html File
app.get('/', function(req, res) {
  res.send( 200)
});
app.use('/api/users', require('./routes/userRoutes'))
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))


