//backend web framework
const express = require('express')
//environment variables
const dotenv = require('dotenv').config()
//middleware inclusion
const { errorHandler } = require('./middleware/errorMiddleware')
//for port
const port = process.env.PORT || 3300

const app =express()

app.use(express.json())
app.use(express)
app.use(express.urlencoded({extended: false}))

app.use('/api/goals', require('./routes/goalRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))