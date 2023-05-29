const mongoose = require('mongoose')

const applicationSchema = mongoose.Schema({
    aID : {type: Number,
        
    },
    body : {type: String},
    applicant:{ type: String},
    reciever: {type: String},
    status: {type: String},
    
})

module.exports = mongoose.model('Application', 'applicationSchema')