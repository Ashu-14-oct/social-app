const express = require('express');
const port = 3000;
const cookieParser = require('cookie-parser');
const sassMiddleware = require('node-sass');
const mongoose = require('mongoose');

const app = express();

// app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(express.static('./assets'));

//setup database

mongoose.connect("mongodb://0.0.0.0:27017/Prjoect2");

const db = mongoose.connection;
db.on('error', console.error.bind(console, "Error connecting to MongoDB"));
db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});



//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');



const MongoStore = require('connect-mongo');


// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codial',
    secret: 'something',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100 )
    },
    // store: new MongoStore({
    //         mongooseConnection: db,
    //         autoRemove: 'disable'
    //     },
    //     function(err){
    //         console.log(err || 'connect-mongo setup ok');
    //     }
    // )
}));
app.use(passport.initialize());
app.use(passport.session()); 
app.use(passport.setAuthenticatedUser);

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