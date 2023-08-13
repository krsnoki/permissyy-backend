const mongoose = require('mongoose')
const { MongoClient } = require('mongodb');
const colors = require('colors');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`.red.underline)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
module.exports = connectDB
