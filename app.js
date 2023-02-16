//Import all the modules

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const app = express();


app.set('view engine', 'ejs');
///For body Parser

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.listen(3000,function(){
    console.log('Server Started on port 3000');

})

//MongoDB
mongoose.set('strictQuery',false);
mongoose.connect('mongodb://localhost:27017/wikiDB',{useNewUrlParser:true});

//Create Schema in MongoDb
const articleSchema = {
    title:{
        type:String,
        required:true

    },
    content:{
        type:String,
        required:true
    }
};
//Create a model in mongo

const Article = mongoose.model('Article',articleSchema);
//WHen a client request the server that i want all the articles.. 
app.get("/articles",function(req,res){
    Article.find(function(err,foundArticle){
        if(!err){
            res.send(foundArticle);
        }else{
      res.send(err.message);
        }
    });
})

//Post request  to the server
app.post('/articles', function (req, res) {
    const newArticle = new Article({
        title:req.body.title,
        content:req.body.content      
    }) ;

    newArticle.save(function(err){
        if(err){
            console.log(err);
        }else{
            console.log("Successfully saved");
        }
    })
    
  });

  app.delete('/articles',function(req,res){
     Article.deleteMany(function(err){
        if(err){
            res.send("Error: " + err.message);
        }else{
           res.send("Successfully deleted");
        }
     })
  })
  