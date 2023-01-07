//jshint esversion:6
const express  = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
require("./db")
const User = require ("./models/userSchema")

const app = express()

app.use(express.static("public"))
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get("/", (req,res) => {
    res.render("home")
})

app.get("/login", (req,res) => {
    res.render("login")
})

app.get("/register", (req,res) => {
    res.render("register")
})

app.post("/register", (req,res) => {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password
    })
    newUser.save((err)=>{
        if(err){
            console.log(err)
        }else{
            res.render("secrets")
        }
    })
})

app.post("/login", (req,res) => {
    const username = req.body.username
    const password = req.body.password

    User.findOne({email: username}, (err, foundUser) => {
        if(err){
            console.log(err)
            res.write("Not found")
        }else{
            if(foundUser){
                if(foundUser.password === password){
                    res.render("secrets")
                }else{
                    res.write("Wrong password")
                }
            }
        }
    })
})

app.listen(3000, () => {
    console.log("Server is up and running at port 3000")
})