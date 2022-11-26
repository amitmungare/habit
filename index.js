// require express for setting up the express server
const express = require('express');
// set up the port number
const port = 8000;
// using express
const app = express();

// get ejs layouts
const expressLayouts = require('express-ejs-layouts');
// setting the database
const database = require('./configs/database');

// used for session cookie
const session = require('express-session');
// passport
const passport = require('passport');
const localPassport = require('./configs/passport');

// database
const MongoStore = require('connect-mongo');

app.use(express.urlencoded());
// use static files, present in assets directory
app.use(express.static('./assets'));
app.use(expressLayouts);

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Setting view engine as ejs
app.set('view engine', 'ejs');
// Setting path for views
app.set('views', './views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name:'habit',
    secret:'null',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 * 1000)
    },
    store:MongoStore.create({
        mongoUrl:'mongodb+srv://amitmungare:amitmungare@habit.0tzz6vg.mongodb.net/?retryWrites=true&w=majority',
        autoRemove:'disabled'
    }, function(error){
        console.log(error || 'connected to mongodb');
    })
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// Redirect all to index.js inside routes directory
app.use('/',require('./routes/index'));

// Setting express to listen to port 8000
app.listen(port, function(error){
    // detected error 
    if(error){
        console.log("Error in starting server", error);
        return;
    }
    // server running 
    console.log(`Server running on port ${port}`);
})