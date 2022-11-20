
const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true
},
    function(req, email, password, done){
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

passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/user/login');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated())res.locals.user = req.user;

    next();
}

passport.serializeUser(function(user, done){
    done(null, user.id)
})

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