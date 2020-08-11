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

mongoose.connect("mongodb://localhost:" + portDB + "/todolistDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

const itemSchema = new mongoose.Schema({
  name:String,
});

const Item = mongoose.model("Item", itemSchema);
const item1 = new Item({name: "First Item"});
const item2 = new Item({name: "Second Item"});
const item3 = new Item({name: "Third Item"});
const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [itemSchema]
};

const List = mongoose.model("List", listSchema);

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
    }
    else {
      res.render("list", {listOfTitle: "Today", theNewItems: items});
    }
  })
})

app.get("/:category", function(req, res){
  const category = req.params.category;

  List.findOne({name: category}, function(err, foundList){
      if(!err){
        if(foundList === null){
          const list = new List({
            name: category,
            items: defaultItems
          });
          list.save();
          res.redirect("/" + category);
        }
        else {
          console.log(category);
          res.render("list", {listOfTitle: foundList.name, theNewItems: foundList.items});
        }
      }
    })
  })

app.post("/", function(req, res){
  // console.log(req.body);
  const itemName = req.body.newItem;
  const listName = req.body.list;
  const item = new Item({name: itemName});

  if(listName === "Today"){
    item.save();
    res.redirect("/");
  } else {
    List.findOne({name: listName}, function(err, foundList){
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
    })
  }
})

app.post("/delete", function(req, res){
  const deleteItemID = req.body.deleteID;
  Item.findByIdAndRemove(
    deleteItemID,
    function(err){
      if(err)  console.log(err);
      else {
        console.log("Successfully deleted");
        res.redirect("/");
      }
    })
})

app.get("/about", function(req, res){
  res.render("about");
})

app.listen(portSer, function(){
  console.log("Hey there!");
})
