const express = require("express");
const bodyParser = require("body-parser");
const port = 3000;

const app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){

  var date = new Date("August 7, 2020");
  var countOfDay = date.getDay();
  var day = "";
  switch(countOfDay){
    case 0: day = "Sunday"; break;
    case 1: day = "Monday"; break;
    case 2: day = "Tuesday"; break;
    case 3: day = "Wednesday"; break;
    case 4: day = "Thursday"; break;
    case 5: day = "Friday"; break;
    case 6: day = "Saturday"; break;
    default: console.log("Error, the number of countOfDay is " + countOfDay);
  }
  res.render("list", {kindOfDay: day});
  // res.sendFile(__dirname + "/index.html");
})





app.listen(port, function(){
  console.log("Hey there!");
})