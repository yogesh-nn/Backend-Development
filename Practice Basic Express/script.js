const express = require("express");
const app = express();

app.get("/", function(req, res){
    res.send("Hello World!");
});

app.get("/profile", function(req, res){
    res.send("This is my profile!!!")
})

app.listen(3000, function(){
    console.log("Server is running on port 3000");
}); 