//importing express 
const express = require('express')

//dotenv req.
const dotenv = require('dotenv').config() 

//importing colors
const colors = require('colors')

//initialising app
const app = express()

const path = require('path');

//port from env file currently set to 3000
const port =  process.env.PORT || 3000

//connection to db
const connectDB = require('./config/db')
connectDB() //making a call to connection function to primt token

app.use(express.urlencoded({ extended: false}))
const { errorHandler } = require('./middleware/errorMiddleware');



// Render Html File
app.get('/', function(req, res) {
  res.send( 200)
});
app.use('/api/users', require('./routes/userRoutes'))
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))