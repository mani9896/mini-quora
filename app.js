const express = require("express");
const mysql = require("mysql");
const app = express();
const ejs = require("ejs");
const session = require("express-session");
const db = require("./config/db.js");
const socketio = require("socket.io");
const PORT = process.env.PORT;
const http = require("http");
const bodyParser = require("body-parser");
const checkifLogged = require("./routes/middleware/checkifLogged");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json({ extended: false }));
const server = http.createServer(app);
const io = socketio(server);
app.use(
  session({
    secret: "2C44-4D44-WppQ38S",
    resave: true,
    saveUninitialized: true,
  })
);

//render home.ejs with passing a variable
app.get("/", async (req, res) => {
  var msg = null;
  var posts;
  if (req.session.admin) {
    msg = ["Logged In"];
  }
  await db.query(
    "SELECT images.post_id, title, text,name, ANY_VALUE(url) AS url FROM post,IMAGES where post.post_id = images.post_id group by post_id",
    function (error, result, fileds) {
      if (error) {
        console.log(error);
      } else {
        res.render("Home", {
          posts: result,
          msg: msg,
          display1: "none",
          display2: "none",
          logged: req.session.admin,
        });
      }
    }
  );
});

//Category filter
app.get("/pick/:category", checkifLogged, async (req, res) => {
  var category = req.params.category;
  await db.query(
    "SELECT POST.post_id,title,category FROM POST WHERE POST.category = ?",
    category,
    function (err, result, fields) {
      if (err) {
        console.log(err);
      } else {
        var len = 100 / result.length;
        res.render("category", { post: result, logged: req.session.admin });
      }
    }
  );
});

//My posts
app.get("/myposts", checkifLogged, async (req, res) => {
  var user = req.session.user;
  await db.query(
    "SELECT POST.post_id,title,category FROM POST WHERE POST.user = ?",
    user,
    function (err, result, fields) {
      if (err) {
        console.log(err);
      } else {
        var len = 100 / result.length;

        res.render("mypost", { post: result, logged: req.session.admin });
      }
    }
  );
});

app.use("/post", require("./routes/post"));

io.on("connection", function (socket) {
  socket.on("add", function () {
    io.emit("image");
  });
  console.log("Connected socket");
});
app.use("/user", require("./routes/user"));
server.listen(3000 || PORT, function (req, res) {
  console.log("Running on Server");
});

//git push -u -f origin master
