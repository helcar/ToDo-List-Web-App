const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");
const portSer = 3000;
const portDB = 27017

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:" + portDB + "/todolistDB", {useNewUrlParser: true, useUnifiedTopology: true})

const itemSchema = new mongoose.Schema({
  name:String,
});

const Item = mongoose.model("Item", itemSchema);
const item1 = new Item({name: "First Item"});
const item2 = new Item({name: "Second Item"});
const item3 = new Item({name: "Third Item"});
const defaultItems = [item1, item2, item3];

app.get("/", function(req, res){
  let day = date.getDate();
  Item.find({},function(err,items){
    if(items.length === 0){
      Item.insertMany(defaultItems, function(err){
        if(err){
          console.log(err);
        } else{
          console.log("Successfully saved.");
        }
      })
        res.redirect("/");
    } else {
      res.render("list", {listOfTitle: day, theNewItems: items});
    }
  })
})

app.post("/", function(req, res){
  // console.log(req.body);
  let itemName = req.body.newItem;
  const item = new Item({name: itemName});
  item.save();
  res.redirect("/")
  // if (req.body.list === "Work") {
  //   newWorkItems.push(item);
  //   res.redirect("/work");
  // } else {
  //   items.push(item);
  //   res.redirect("/")
  // }
})

app.get("/work", function(req, res){
  res.render("list", {listOfTitle: "Work List", theNewItem: newWorkItems})
})

app.get("/about", function(req, res){
  res.render("about");
})

app.listen(portSer, function(){
  console.log("Hey there!");
})
