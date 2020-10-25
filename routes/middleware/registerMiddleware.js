const bodyParser = require("body-parser");
const db = require("../../config/db.js");

const checkIfUserExists = async (req, res, next) => {
  var fail=false;
  var msg = [];
  await db.query(
    "SELECT * FROM user WHERE email = ?",
    req.body.Email,
    function (error, results, fields) {
      if (results.length > 0) {
        msg.push("USERA LREADY");
        ifUserfound = true;
      }
      db.query("SELECT * FROM user WHERE email = ?", req.body.Email, function (
        error,
        results,
        fields
      ) {
        if (results.length > 0) {
          msg.push("ALREADY HERE");
          res.render("Home", { msg: msg,fail:fail,display1:"none",display2:"block",logged:false });
          ifUserfound = true;
        } else {
          next();
        }
      });
    }
  );
};

module.exports = checkIfUserExists;
