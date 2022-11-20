
const express = require('express')
const passport = require('passport')
const router = express.Router();

const controller  = require('../controllers/userController');

router.get('/register', controller.register);
router.get('/login', controller.login);
router.get('/logout', controller.logoutUser);
router.get('/about',passport.checkAuthentication, controller.about);
router.post('/createUser', controller.createUser);
router.post('/createSession', passport.authenticate('local',{
    failureRedirect:'/user/login',
}), controller.createSession);

module.exports = router;