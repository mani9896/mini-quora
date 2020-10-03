//All backend related to Users

const express = require("express");
const mysql = require("mysql");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const db = require("../config/db.js");
const PORT = process.env.PORT;
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
const router = express.Router();
const mid = (req, res, next) =>
  db.query("SELECT * FROM user WHERE email = ?", req.body.Email, function (
    error,
    results,
    fields
  ) {
    if (results.length > 0) {
      res.render("SignUP", { msg: "USER ALREADY REGISTERED" });
      ifUserfound = true;
    } else {
      next();
    }
  });
router.get("/login", (req, res) => {
  res.render("Home", { name: "hjhgh" });
});
router.get("/signup", (req, res) => {
  res.render("SignUP", { msg: null });
});
router.post("/signup", mid, async (req, res) => {
  var today = new Date();
  var users = {
    name: req.body.firstname,
    email: req.body.Email,
    password: req.body.password,
    created_at: today,
    updated_at: today,
  };
  const salt = await bcrypt.genSalt(10);
  users.password = await bcrypt.hash(req.body.password, salt);

  var ifUserfound = false;

  if (!ifUserfound) {
    await db.query("INSERT INTO user SET ?", users, function (
      error,
      results,
      fields
    ) {
      if (error) {
        console.log(error);
        res.send("USER NOT REGISTERED");
      } else {
        res.render("Login", { msg: "USER REGISTERED PLEASE LOGIN" });
      }
    });
  }
});

module.exports = router;

// var isMatch = await bcrypt.compare(password, user.password);
