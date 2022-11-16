const User = require('../models/user');
const Habit = require('../models/habit');


module.exports.register = function(req, res){
    if(req.isAuthenticated()){
        req.flash('success', "Please Login");
        return res.render('dashboard',{
            title:'Dashboard'
        })
    }else{
        return res.render('register',{
            title:'Register'
        })
    }
}

module.exports.login = function(req, res){
    if(req.isAuthenticated()){
        req.flash('success', "Please Login");
        return res.render('dashboard',{
            title:'Dashboard'
        })
    }else{
        return res.render('login',{
            title:'Login'
        })
    }
}

module.exports.logout = function(req, res){
    req.logout();

    req.flash('success', "Logged out")
    return res.redirect('/')
}

module.exports.createSession = function(req, res){
    req.flash('success','Logged In Successfully')
    return res.redirect('/habit/dashboard');
}

module.exports.createUser = function(req, res){
    if(req.password != req.cpassword){
        req.flash('message','Incorrect password')
        return;
    }
    User.create(req.body, function(error, user){
        if(error){
            console.log("Error in creating user", error);
            return;
        }
        res.redirect('./user/login');
        
    })
}