const bodyParser = require("body-parser");
const db = require("../../config/db.js");

const checkIfUserExists = (req, res, next) =>
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

module.exports = checkIfUserExists;
