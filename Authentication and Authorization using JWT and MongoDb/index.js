const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const path = require("path");
const userModel = require("./models/createUser");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/createUser", (req, res) => {
  let { email, name, age, password } = req.body;

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, async (err, hash) => {
      let createdUser = await userModel.create({
        name,
        email,
        age,
        password: hash,
      });

      const token = jwt.sign({ email }, "shhhhhhhhh");
      res.cookie("token", token);

      res.send(createdUser);
    });
  });
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.post("/login", async function (req, res) {
  let user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    res.send("something is wrong!!!");
  }
  bcrypt.compare(req.body.password, user.password, function (err, result) {
    if (!result) {
      res.send("Something is wrong!!!");
    } else {
      const token = jwt.sign({ email: user.email }, "shhhhhhhhh");
      res.cookie("token", token);
      res.send("You are Logged In...!!!");
    }
  });
});

app.get("/logout", function (req, res) {
  res.cookie("token", "");
  res.redirect("/");
});

app.listen(3000, function (err) {
  console.log("Server is running at 3000");
});
