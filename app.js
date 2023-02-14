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
//On video 366 the starting.....