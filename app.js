const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const port = 3000;

const app = express();

var newItems = ["the first item", "the second item", "the third item"];
var newWorkItems = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req, res){
  let day = date.getDate();
  res.render("list", {listOfTitle: day, theNewItem: newItems});
})

app.post("/", function(req, res){
  // console.log(req.body);
  let item = req.body.newItem;
  if (req.body.list === "Work") {
    newWorkItems.push(item);
    res.redirect("/work");
  } else {
    newItems.push(item);
    res.redirect("/")
  }
})

app.get("/work", function(req, res){
  res.render("list", {listOfTitle: "Work List", theNewItem: newWorkItems})
})

app.get("/about", function(req, res){
  res.render("about");
})

app.listen(port, function(){
  console.log("Hey there!");
})
