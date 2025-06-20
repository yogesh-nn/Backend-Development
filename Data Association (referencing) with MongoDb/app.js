const express = require("express");
const userModel = require("./models/user");
const postModel = require("./models/post");

const app = express();

app.get("/", (req, res) => {
  res.send("hello wprdld");
});

app.get("/create", async (req, res) => {
  const user = await userModel.create({
    userName: "Yogesh Navandhar",
    email: "yogesh@hotmai.com",
    age: 25,
  });
  res.send(user);
});

app.get("/post/create", async (req, res) => {
  const post = await postModel.create({
    user: "685531a3a7d1b029d7b134bf",
    postData: "hello, how do you do!!!",
  });

  let user = await userModel.findOne({ _id: "685531a3a7d1b029d7b134bf" });
  user.posts.push(post._id);

  await user.save();
  res.send(post);
});

app.listen(3000, function (err) {
  console.log("server is running at 3000");
});
