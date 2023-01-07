const mongoose = require("mongoose")
const Schema = mongoose.Schema
const encrypt = require("mongoose-encryption")
const passport = require("passport")
require('dotenv').config()
const passportLocalMongoose = require("passport-local-mongoose")

const userSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    }
})

userSchema.plugin(passportLocalMongoose)

const User = new mongoose.model("User", userSchema)

passport.use(User.createStrategy())

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

module.exports = User