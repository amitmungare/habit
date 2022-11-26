// require express for setting up the express server
const express = require('express')
// setting passport
const passport = require('passport')
// setting up the Router 
const router = express.Router();

// requiring the user controller 
const controller  = require('../controllers/userController');


// this will handle the requests coming to /register
router.get('/register', controller.register);
// this will handle the requests coming to /login
router.get('/login', controller.login);
// this will handle the requests coming to /logout
router.get('/logout', controller.logoutUser);
// this will handle the requests coming to /about
router.get('/about',passport.checkAuthentication, controller.about);
// this will handle the requests coming to /createUser
router.post('/createUser', controller.createUser);
// this will handle the requests coming to /createSession
router.post('/createSession', passport.authenticate('local',{
    failureRedirect:'/user/login',
}), controller.createSession);

// exporting the router
module.exports = router;