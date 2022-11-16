
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
                req.flash('error', error);
                return done(error);
            }
            if(!user || user.password != password){
                req.flash('error', "Invaild username or password");
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



module.exports = passport