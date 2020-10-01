const express = require("express");
const mysql = require("mysql");
const app = express();
const connectDB = require("./config/db.js");
const PORT = process.env.PORT;
app.set("view engine", "ejs");
app.use(express.static("public"));
connectDB();

app.get("/", (req, res) => {
  res.render("Home");
});

app.listen(3000 || PORT, function (req, res) {
  console.log("Running on Server");
});

//git push -u -f origin master
