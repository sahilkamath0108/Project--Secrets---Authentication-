//jshint esversion:6
const express  = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
require("./db")
const User = require ("./models/userSchema")
const session = require("express-session")
const passport = require("passport")


const app = express()

app.use(express.static("public"))
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(session({
    secret: "this is my secret",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.get("/", (req,res) => {
    res.render("home")
})

app.get("/auth/google", passport.authenticate("google", {
    scope: ['profile']
}))

app.get("/auth/google/secrets", passport.authenticate('google', {failureRedirect: '/login'}),
    (req,res) => {
        res.redirect("/secrets")
    })

app.get("/login", (req,res) => {
    res.render("login")
})

app.get("/register", (req,res) => {
    res.render("register")
})

app.get("/secrets", (req,res) => {
    if(req.isAuthenticated()){
        res.render("secrets")
    }else{
        res.redirect("/login")
    }
})

app.post("/register", (req,res) => {
    User.register({username : req.body.username}, req.body.password, (err,user) => {
        if(err){
            console.log(err)
            res.redirect("/register")
        }else{
            passport.authenticate("local")(req,res,() => {
                res.redirect("/secrets")
            })
        }
    })  
})

app.post("/login", (req,res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    })

    req.login(user, (err) => {
        if(err){
            console.log(err)
        }else{
            passport.authenticate("local")(req,res,() => {
                res.redirect("/secrets")
            })
        }
    })
})

app.get("/logout", (req,res) => {
    req.logout(function(err) {
        if (!err) {
            res.redirect("/");
        }
    })
})

app.listen(3000, () => {
    console.log("Server is up and running at port 3000")
})