const express = require("express");
const bodyParser = require("body-parser");
const port = 3000;

const app = express();

var newItems = ["the first item", "the second item", "the third item"];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req, res){

  var todayDate = new Date();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  var day = todayDate.toLocaleDateString("en-US", options);

  res.render("list", {kindOfDay: day, theNewItem: newItems});
})

app.post("/", function(req, res){
  var item = req.body.newItem;
  newItems.push(item);
  res.redirect("/");
  //
})


app.listen(port, function(){
  console.log("Hey there!");
})
