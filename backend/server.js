const express = require('express')
const app = express()
const port = 3000
const path = require('path');


// Render Html File
app.get('/', function(req, res) {
  res.send( 200)
});
app.use('/api/goals', require('./routes/goalRoutes'))


app.listen(port, () => console.log(`Server started on port ${port}`))