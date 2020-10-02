//All backend related to Users

const express = require("express");
const mysql = require("mysql");
const app = express();
const db = require("../config/db.js");
const PORT = process.env.PORT;
app.set("view engine", "ejs");
app.use(express.static("public"));
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("Home", { name: "hjhgh" });
});

module.exports = router;
