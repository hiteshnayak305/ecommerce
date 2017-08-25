var express = require('express');
var router = express.Router();
var passport = require('passport');

var signupController = require('../controllers/signupController');

console.log('in signup.js');
/* GET signup page. */
router.get('/', signupController);


router.post('/', passport.authenticate('local-signup', {
    successRedirect: '/login', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));

module.exports = router;
