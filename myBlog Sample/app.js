//jshint esversion:6

const express = require("express");
const ejs = require("ejs");
const _ = require ("lodash");
const mongoose = require ("mongoose");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect ("mongodb+srv://admin-Kenneth:ASAken12345@cluster0.vtd9t.mongodb.net/Blog?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const postsSchema =new mongoose.Schema ({
  title: String,
  content: String
});

const Post= new mongoose.model ("post", postsSchema);


app.get("/", function (req, res){

  Post.find({},function (err, docs) {

    res.render ("home", {
    introHome:homeStartingContent,
    posts: docs
    });
  });
});

app.get ("/about", function(req, res){ 
  res.render ("about", {introAbout: aboutContent });
});

app.get ("/contact", function (req, res){
  res.render ("contact", {introContact : contactContent});
});


app.get ("/compose", function(req, res){
  res.render ("compose");
});

app.post ("/compose", function (req, res){
  
  const post= new Post ({
    title:   req.body.msgTitle,
    content:  req.body.msgPost
  });
  post.save(function (err){
    if (!err) {
      res.redirect ("/");
    }
  });
});


app.get ("/post/:postId", function(req, res){

  const requestedId = req.params.postId;

  Post.findOne({_Id: requestedId}, function (err, result){
    res.render("post", {
      TitleTxt: post.title,
      PostTxt:  post.content
    }); 
  });

// A code I used to run the blog Locally

  /*const save1 = _.lowerCase(req.params.postName);

  posts.forEach(function (object) {

  const save2 = _.lowerCase(object.TitleTxt);

    if ( save2 === save1) {

      res.render ("post", {
        TitleTxt:object.TitleTxt,
        PostTxt: object.PostTxt
      });
    }

  });*/
  
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen (port, function(){
    console.log ("Server started successfully");
});