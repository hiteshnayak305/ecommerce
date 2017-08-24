var express = require('express');
var router = express.Router();
var passport = require('passport');

var loginController = require('../controllers/loginController');

/* GET login page. */
router.get('/', loginController);


router.post('/', passport.authenticate('local-login', {
    successRedirect: '/dashboard', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));

module.exports = router;
