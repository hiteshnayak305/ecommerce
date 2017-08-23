var express = require('express');
var router = express.Router();

var signupController = require('../controllers/signupController');

/* GET signup page. */
router.get('/', signupController);
router.post('/', function(req, res, next) {
    console.log('POST recieved from ' + req.data);
});

module.exports = router;
