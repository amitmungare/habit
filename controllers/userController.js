const User = require('../models/user');
const Habit = require('../models/habit');


module.exports.register = function(req, res){
    if(req.isAuthenticated()){
        return res.render('habitlist',{
            title:'habitlist'
        })
    }else{
        return res.render('register',{
            title:'Register'
        })
    }
}

module.exports.login = function(req, res){
    if(req.isAuthenticated()){
        return res.render('habitlist',{
            title:'habitlist'
        })
    }else{
        return res.render('login',{
            title:'Login'
        })
    }
}

module.exports.about = function(req, res){
    if(req.isAuthenticated()){
        return res.render('about',{
            title:'about'
        })
    }else{
        return res.render('login',{
            title:'Login'
        })
    }
}

module.exports.logoutUser = function(req, res){
    // req.logout();

    req.logout(function(err) {
        if (err) { return }
        res.redirect('/');
    });

    return res.redirect('/')
}

module.exports.createSession = function(req, res){
    return res.redirect('/habit/habitlist');
}

module.exports.createUser = function(req, res){
    if(req.password != req.cpassword){
        return;
    }
    User.create(req.body, function(error, user){
        if(error){
            console.log("Error in creating user", error);
            return;
        }
        res.redirect('/user/login');
        
    })
}