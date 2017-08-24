var express = require('express');
var router = express.Router();

var logoutController = require('../controllers/logoutController');

/* GET login page. */
router.get('/', logoutController);

router.post('/', function(req, res, next) {
    console.log('POST recieved @ logout ');
    res.redirect('/logout');
});

module.exports = router;
