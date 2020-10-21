const bodyParser = require("body-parser");
const db = require("../../config/db.js");

const checkIfUserExists = async (req, res, next) => {
  var fail=false;
  var msg = [];
  await db.query("SELECT * FROM user WHERE email = ?", req.body.email, function (
        error,
        results,
        fields
      ) {
        if (results.length ===0) {
          msg.push("User Not registered");
          res.render("Home", { msg: msg,fail:fail,display1:"none",display2:"block" });
          ifUserfound = true;
        } else {
          next();
        }
      });
    
};

module.exports = checkIfUserExists;
