const express = require('express');
const port = 8000;
const app = express();

const expressLayouts = require('express-ejs-layouts');
const database = require('./configs/database');

const session = require('express-session');
const passport = require('passport');
const localPassport = require('./configs/passport');

const MongoStore = require('connect-mongo');

const flash = require('connect-flash');
const customMiddleware = require('./configs/middleware');

app.use(express.urlencoded());
app.use(express.static('./assets'));
app.use(expressLayouts);

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name:'habit',
    secret:'null',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:MongoStore.create({
        mongoUrl:'mongodb://localhost:27017/habit',
        autoRemove:'disabled'
    }, function(error){
        console.log(error || 'connected to mongodb');
    })
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


app.use(flash());
app.use(customMiddleware.setFlash);

app.use('/',require('./routes/index'));

app.listen(port, function(error){
    if(error){
        console.log("Error in starting server", error);
        return;
    }
    console.log(`Server running on port ${port}`);
})