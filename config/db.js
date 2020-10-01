const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "firstDB",
});

const connectDB = async () => {
  try {
    await db.connect((err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Connected ");
      }
    });
  } catch (err) {
    console.log(err.msg);
  }
};

module.exports = connectDB;
