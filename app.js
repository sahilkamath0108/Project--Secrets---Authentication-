//jshint esversion:6
const express  = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")

const app = express()

app.use(express.static("public"))
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get("/", (req,res) => {
    res.render("login")
})

app.get("/register", (req,res) => {
    res.render("login")
})

app.listen(3000, () => {
    console.log("Server is up and running at port 3000")
})