const express = require("express");
const app = express();

const userModel = require("./userModel");



app.get("/", function(req, res){
    res.send("Hello World...");
});

app.get("/create", async (req, res) => {
    let createdUser = await userModel.create({
        name: "Yogita",
        userName: "yogita491",
        email: "yogita@hotmail.com"
    });
    res.send(createdUser);
});

app.get("/read", async function(req, res){
    let readUser = await userModel.find();
    res.send(readUser);
});

app.get("/update", async function (req, res) {
    let updatedUser = await userModel.findOneAndUpdate({name: "Yogita"}, {email: "yogita100@hotmail.com"}, {new: true});
    res.send(updatedUser);
});

app.get("/delete", async function(req, res){
    let deleteUser = await userModel.findOneAndDelete({name: "Yogesh"});
    res.send(deleteUser);
});

app.listen(3000, function(err){
    console.log("Server is started at port 3000...")
});