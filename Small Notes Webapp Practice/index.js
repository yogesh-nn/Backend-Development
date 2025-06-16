const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const { log } = require("console");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  fs.readdir(`./files`, function (err, files) {
    res.render("index", { files: files });
  });
});

app.post("/create", function (req, res) {
  fs.writeFile(
    `./files/${req.body.title.split(" ").join("")}.txt`,
    req.body.description,
    function (err) {
      res.redirect("/");
    }
  );
});

app.get("/editFileName/:fileName", function (req, res) {
  // fs.rename(`./files/${req.params.fileName}`, `./files/${req.body.new}`);
  res.render("editFileName", { fileName: req.params.fileName });
});

app.post("/editFileName", function (req, res) {
  fs.rename(
    `./files/${req.body.old}`,
    `./files/${req.body.new}`,
    function (err) {
      res.redirect("/");
    }
  );
});

app.get("/files/:fileName", function (req, res) {
  fs.readFile(
    `./files/${req.params.fileName}`,
    "utf-8",
    function (err, fileData) {
      res.render("readMore", {
        fileName: req.params.fileName,
        fileData: fileData,
      });
    }
  );
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
