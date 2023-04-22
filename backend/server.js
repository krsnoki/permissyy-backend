const express = require('express')
const app = express()
const port =  3000
const path = require('path');
app.use(express.urlencoded({ extended: false}))
const { errorHandler } = require('./middleware/errorMiddleware')


// Render Html File
app.get('/', function(req, res) {
  res.send( 200)
});
app.use('/api/goals', require('./routes/goalRoutes'))
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))