const express = require('express');
const router = express.Router();

const controller = require('../controllers/homeController');

router.get('/', controller.home);

router.use('/user', require('./user'));
router.use('/habit', require('./habit'));

module.exports = router;