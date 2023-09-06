const mongoose = require('mongoose');


const applicationSchema = new mongoose.Schema({
    applicant: { type: String, required: true },
    body: { type: Object, required: true },
    recieverId: { type: String, required: true },
    status: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
  });
  

// Export the model properly
module.exports = mongoose.model('Application', applicationSchema);
