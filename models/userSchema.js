const mongoose = require("mongoose")
const Schema = mongoose.Schema
const encrypt = require("mongoose-encryption")
const passport = require("passport")
require('dotenv').config()
const passportLocalMongoose = require("passport-local-mongoose")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const findOrCreate = require('mongoose-findorcreate')

const userSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    googleId: {
        type: String
    },
    secret: {
        type: String
    }
})

userSchema.plugin(passportLocalMongoose)
userSchema.plugin(findOrCreate)

const User = new mongoose.model("User", userSchema)

passport.use(User.createStrategy())

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser((id,done)=>{
    User.findById(id, (err,user) => {
        done(err,user)
    })
})

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  (accessToken, refreshToken, profile, cb) => {
    User.findOrCreate({ googleId: profile.id }, (err, user) => {
      return cb(err, user);
    });
  }
))

module.exports = User