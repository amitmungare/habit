const User = require('../models/user');
const Habit = require('../models/habit');

// function to register user 
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

// function to login user 
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

// function to get user details
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


// function to logout user 
module.exports.logoutUser = function(req, res){
    req.logout(function(err) {
        if (err) { return }
        res.redirect('/');
    });

    return res.redirect('/')
}


// function to create session
module.exports.createSession = function(req, res){
    return res.redirect('/habit/habitlist');
}

// this is a function to create a user 
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