const express = require("express");
const mysql = require("mysql");
const app = express();
const db = require("./config/db.js");
const PORT = process.env.PORT;
app.set("view engine", "ejs");
app.use(express.static("public"));

const name = "Mani";
//Calling Connect DB to connect
db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected ");
  }
});

//render home.ejs with passing a variable
app.get("/", (req, res) => {
  res.render("Home", { name: name });
});
app.listen(3000 || PORT, function (req, res) {
  console.log("Running on Server");
});

//git push -u -f origin master
