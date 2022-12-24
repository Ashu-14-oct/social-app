const express = require('express');
const port = 3000;
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const app = express();

app.use(express.urlencoded());
app.use(cookieParser());
//setup database

mongoose.connect("mongodb://0.0.0.0:27017/Prjoect2");

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});

//use express router
const way = require('./routes/index');
app.use('/', way);

//setup the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err){
    if(err) console.log('error in server');

    else{
        console.log("server running on port :", port);
    }
})