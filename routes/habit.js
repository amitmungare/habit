
const express = require('express');
const router = express.Router();
const passport = require('passport');

const controller = require('../controllers/habitController');

router.post('/create', controller.createHabit);


router.get('/habitlist',passport.checkAuthentication, controller.habitList);
router.get('/habitlistWeekly', passport.checkAuthentication, controller.habitListWeekly);
router.get('/update/:id/:day/:status', controller.update);
router.get('/delete/:id', controller.deleteHabit);


module.exports = router;