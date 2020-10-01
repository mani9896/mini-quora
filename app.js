const express = require("express");
const mysql = require("mysql");
const app = express();
const connectDB = require("./config/db.js");
const PORT = process.env.PORT;

connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to mini");
});

app.listen(3000 || PORT, function (req, res) {
  console.log("Running on Server");
});

//git push -u -f origin master
