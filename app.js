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
//Creating Routes for all articles..
app.route('/articles').get(function(req,res)

{
    Article.find(function(err,foundArticle){
        if(!err){
            res.send(foundArticle);
        }else{
      res.send(err.message);
        }
    });
}).post(function (req, res)
{
   const newArticle = new Article({
       title:req.body.title,
       content:req.body.content      
   }) ;

   newArticle.save(function(err){
       if(err){
           console.log(err);
       }else{
           console.log("Successfully saved");
           res.send('New Article posted successfully')
       }   })
   
})
.delete(function(req,res){
    Article.deleteMany(function(err){
       if(err){
           res.send("Error: " + err.message);
       }else{
          res.send("Successfully deleted");
       }
    })
 });






//Post request  to the server


  app.delete('/articles',function(req,res){
     Article.deleteMany(function(err){
        if(err){
            res.send("Error: " + err.message);
        }else{
           res.send("Successfully deleted");
        }
     })
  })
  
  //add a specific route
  app.route('/articles/:articleTitle').get(function(req,res){

    

   Article.findOne({title:req.params.articleTitle},function(err,foundArticle){
       if(foundArticle){
        res.send(foundArticle)
       }
       else{
        res.send("No such Article found named " + req.params.articleTitle);
       }
   });
//To update a specific article
  }).put(function(req,res){
    Article.updateOne({title:req.params.articleTitle},
        {$set: { content:req.body.content,title:req.body.title}},function(err,foundArticle){
            if(!err){
                res.send("Successfully updated")
                console.log(`$title${req.params.articleTitle}} + " "+${req.body.title}
                `)
            }
           else{
            res.send("Error updating article"+err.message) 
           }
        }
        );
  });
  //371 signing off... 
  