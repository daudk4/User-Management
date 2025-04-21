const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/mongodbpractice')

const userSchema = mongoose.Schema({
    username: String,
    name: String,
    email: String,
    contact: Number
})

module.exports = mongoose.model('user', userSchema)