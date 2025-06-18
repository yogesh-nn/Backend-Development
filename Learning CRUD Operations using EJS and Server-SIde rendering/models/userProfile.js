const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/smallProjectMongodb");

const userProfileSchema = mongoose.Schema({
  email: String,
  name: String,
  imageURL: String,
});

module.exports = mongoose.model("userProfile", userProfileSchema);
