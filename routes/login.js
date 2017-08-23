var express = require('express');
var router = express.Router();

var loginController = require('../controllers/loginController');

/* GET login page. */
router.get('/', loginController);
router.post('/', function(req, res, next) {
    console.log('POST recieved from ' + req.data);
});

module.exports = router;
