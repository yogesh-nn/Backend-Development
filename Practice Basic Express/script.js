const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));



app.use(function(req, res, next){
    console.log("Request received at: " + Date.now());
    next();
});


app.get("/", function(req, res){
    res.render("index");
});


app.get("/profile/:username", function(req, res){
    res.send(`This is the profile of ${req.params.username}`);
});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});