var express = require('express');
var router = express.Router();

var dashboardController = require('../controllers/dashboardController');
var isLoggedIn = require('../middlewares/isLoggedIn');

/* GET dashbboard page. */
router.get('/', isLoggedIn, dashboardController);

router.post('/', function(req, res, next) {
    console.log('POST recieved @ dashboard');
    res.redirect('/dashboard');
});

module.exports = router;
