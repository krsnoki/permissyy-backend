const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  userID: Number,
  name: String,
  phone: {
    type: String,
    required: true,
    validate: {
      validator: value => /^\d{10}$/.test(value),
      message: 'Invalid phone number format'
    }
  },
  username: String,
  role: String,
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  password: String
});

module.exports = model('User', userSchema);
