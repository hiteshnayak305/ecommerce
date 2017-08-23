var express = require('express');
var router = express.Router();

var logoutController = require('../controllers/logoutController');

/* GET login page. */
router.get('/', logoutController);

router.post('/', function(req, res, next) {
    console.log('POST recieved from ' + req.data);
});

module.exports = router;
