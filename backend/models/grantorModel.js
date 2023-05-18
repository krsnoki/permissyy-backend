const mongoose = require('mongoose')

const grantorModel = mongoose.Schema({
    name: {type: String},
    email: { type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/},
    role: {type: String}
    
})