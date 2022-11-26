// require express for setting up the express server
const express = require('express');
// Setup the Router
const router = express.Router();
// Setting path for controller function
const controller = require('../controllers/homeController');

// Setting controller function to a route
router.get('/', controller.home);


// Route all requests starting with '/user' to user.js file
router.use('/user', require('./user'));
// Route all requests starting with '/habit' to habit.js file
router.use('/habit', require('./habit'));

// exporting the router
module.exports = router;