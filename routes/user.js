//All backend related to Users
//Basic NodejS setup
const express = require("express");
const mysql = require("mysql");
const app = express();
const bodyParser = require("body-parser");
const db = require("../config/db.js");
const PORT = process.env.PORT;
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
const router = express.Router();

//For Encryption
const bcrypt = require("bcryptjs");

//To Check if user already exists
const checkIfUserExists = require("./middleware/registerMiddleware");

router.get("/login", (req, res) => {
  res.render("Login", { msg: null });
});

//GET user/signup
router.get("/signup", (req, res) => {
  res.render("SignUP", { msg: null });
});

//Handle Registering Users
//POST user/signup
router.post("/signup", checkIfUserExists, async (req, res) => {
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

  {
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
