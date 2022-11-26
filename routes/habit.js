// requiring the movie controller 
const express = require('express');
// setting up the Router 
const router = express.Router();
// setting passport
const passport = require('passport');

// requiring the user controller 
const controller = require('../controllers/habitController');

// this will handle the requests coming to /create
router.post('/create', controller.createHabit);
// this will handle the requests coming to /habitlist
router.get('/habitlist',passport.checkAuthentication, controller.habitList);
// this will handle the requests coming to /habitlistWeekly
router.get('/habitlistWeekly', passport.checkAuthentication, controller.habitListWeekly);
// this will handle the requests coming to //update/:id/:day/:status
router.get('/update/:id/:day/:status', controller.update);
// this will handle the requests coming to /delete/:id
router.get('/delete/:id', controller.deleteHabit);

// exporting the router
module.exports = router;