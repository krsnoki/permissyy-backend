const mongoose = require('mongoose')

const grantorSchema = mongoose.Schema({
    gID: {type: Number},
    name: {type: String},
    email: { type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/},
    role: {type: String}
    
})

module.exports = mongoose.model(Grantor, grantorSchema)