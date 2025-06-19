const mongoose = require("mongoose");

mongoose.connect(`mongodb://127.0.0.1:27017/authSmallProject`);

const userSchema = mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  password: String,
});

module.exports = mongoose.model("createUser", userSchema);
