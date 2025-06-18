const express = require("express");
const app = express();
const path = require("path");
const userProfileModel = require("./models/userProfile");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/read", async function (req, res) {
  const readUserProfiles = await userProfileModel.find();
  res.render("read", { readUserProfiles });
});

app.post("/create", async function (req, res) {
  let { name, email, imageURL } = req.body;

  let createdUserProfile = await userProfileModel.create({
    name,
    email,
    imageURL,
  });
  res.redirect("read");
});

app.get("/deleteUserProfile/:id", async (req, res) => {
  await userProfileModel.findOneAndDelete({
    _id: req.params.id,
  });
  res.redirect("/read");
});

// app.get("/editProfile", function (req, res) {
//   res.render("index");
// });


app.listen(3000, function (err) {
  console.log("Server is running on port 3000");
});
