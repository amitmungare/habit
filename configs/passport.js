
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true
},
    function(req, email, password, done){
        // find a user and establish the identity
        User.findOne({email:email}, function(error, user){
            if(error){
                return done(error);
            }
            if(!user || user.password != password){
                return done(null, false);
            }
            return done(null, user);
        })
    }
))

// check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    // if the user is not signed in
    return res.redirect('/user/login');
}

passport.setAuthenticatedUser = function(req, res, next){
    // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
    if(req.isAuthenticated())res.locals.user = req.user;

    next();
}

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id)
})

// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(error, user){
        if(error){
            console.log("Error: did not find the user")
            return done(error)
        }
        return done(null, user)
    })
})


module.exports = passport