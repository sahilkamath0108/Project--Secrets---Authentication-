const mongoose = require("mongoose")
const Schema = mongoose.Schema
const encrypt = require("mongoose-encryption")
require('dotenv').config();

const userSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    }
})

const User = new mongoose.model("User", userSchema)

module.exports = User