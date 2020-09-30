const express = require("express");

const app = express();

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Welcome to mini");
});

app.listen(3000 || PORT, function (req, res) {
  console.log("Running on Server");
});
