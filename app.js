const express = require("express");
const mysql = require("mysql");
const app = express();
const ejs = require("ejs");
const session = require("express-session");
const db = require("./config/db.js");
const PORT = process.env.PORT;
const bodyParser = require("body-parser");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json({ extended: false }));
const name = "";
app.use(
  session({
    secret: "2C44-4D44-WppQ38S",
    resave: true,
    saveUninitialized: true,
  })
);
//render home.ejs with passing a variable
app.get("/", (req, res) => {
  var msg=null;
  if(req.session.admin)
  {
    msg=["Logged In"];
  }
  res.render("Home", { msg:msg  ,display1:"none",display2:"none",logged:req.session.admin});
});
app.use("/user", require("./routes/user"));
app.listen(3000 || PORT, function (req, res) {
  console.log("Running on Server");
});

//git push -u -f origin master
