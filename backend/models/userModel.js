//for schema required here
//bringing in mongoose
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userID:{type: Number},
    name:{type: String},
    phone:{type: Number},
    username:{type: String},
    designation:{type: String},
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      },
}
)

module.exports = mongoose.model('User', userSchema)