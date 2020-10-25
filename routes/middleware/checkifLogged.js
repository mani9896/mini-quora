const session = require("express-session");

const checkifLogged = (req, res, next) => {
  if (!req.session.admin) {
    res.redirect("/user/login");
  } else {
    next();
  }
};

module.exports = checkifLogged;
