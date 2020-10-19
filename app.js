const express = require("express");
const mysql = require("mysql");
const app = express();
const ejs = require("ejs");
const db = require("./config/db.js");
const PORT = process.env.PORT;
const bodyParser = require("body-parser");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json({ extended: false }));
const name = "";

//render home.ejs with passing a variable
app.get("/", (req, res) => {
  res.render("Home", { msg: null ,display1:"none",display2:"none"});
});
app.use("/user", require("./routes/user"));
app.listen(3000 || PORT, function (req, res) {
  console.log("Running on Server");
});

//git push -u -f origin master
