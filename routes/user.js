//All backend related to Users
//Basic NodejS setup
const express = require("express");
const mysql = require("mysql");
const app = express();
const session = require("express-session");
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
const checkIfRegister = require("./middleware/loginMiddleware");
//Handle Registering Users
//POST user/signup
router.post("/signup", checkIfUserExists, async (req, res) => {
  var today = new Date();
  var users = {
    name: req.body.firstname,
    email: req.body.Email,
    password: req.body.password[0],
    created_at: today,
    updated_at: today,
  };

  const salt = await bcrypt.genSalt(10);
  users.password = await bcrypt.hash(req.body.password[0], salt);
  msg = "";
  {
    await db.query(
      "INSERT INTO user SET ?",
      users,
      function (error, results, fields) {
        if (error) {
          console.log(error);
          res.send("USER NOT REGISTERED");
        } else {
          msg = "USER REGISTERED PLEASE LOGIN";
          var fail = true;
          res.render("Home", {
            msg: ["USER REGISTERED PLEASE LOGIN"],
            fail: fail,
            display1: "block",
            display2: "none",
            logged: req.session.admin,
          });
          // res.redirect("/user/logn");
        }
      }
    );
  }
});

router.get("/login", function (req, res) {
  res.render("Home", {
    msg: null,
    display1: "block",
    display2: "none",
    logged: req.session.admin,
  });
});

router.get("/signup", function (req, res) {
  res.render("Home", {
    msg: null,
    display1: "none",
    display2: "block",
    logged: req.session.admin,
  });
});

//Handle POST user Login
router.post("/login", checkIfRegister, async (req, res) => {
  await db.query(
    "SELECT * FROM user WHERE email = ?",
    req.body.email,
    async (error, result, fields) => {
      var isMatch = await bcrypt.compare(req.body.password, result[0].password);
      if (isMatch) {
        isLogged = true;
        console.log(result);
        req.session.name = result[0].name;
        req.session.user = result[0].id;
        req.session.admin = true;
        res.redirect("/");
      } else {
        var msg = ["Wrong Credentials"];
        res.render("Home", {
          msg: msg,
          display1: "block",
          display2: "none",
          logged: req.session.admin,
        });
      }
    }
  );
});

router.get("/logout", function (req, res) {
  req.session.admin = false;
  res.redirect("/");
});
module.exports = router;

// var isMatch = await bcrypt.compare(password, user.password);
