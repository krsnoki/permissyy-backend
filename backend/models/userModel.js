//for schema required here
//bringing in mongoose
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{type: String},
    phone:{type: Number},
    username:{type: String},
    designation:{type: String},
    
}
)

module.exports = mongoose.model('User', userSchema)