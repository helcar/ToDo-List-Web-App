const express = require("express");
const bodyParser = require("body-parser");
const port = 3000;

const app = express();

var newItem = "";

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){

  var todayDate = new Date();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  var day = todayDate.toLocaleDateString("en-US", options);

  res.render("list", {kindOfDay: day, theNewItem: newItem});
})

app.post("/", function(req, res){
  newItem = req.body.newItem;
  res.redirect("/");
  //
})


app.listen(port, function(){
  console.log("Hey there!");
})
