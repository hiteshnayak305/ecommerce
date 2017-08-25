var express = require('express');
var router = express.Router();

var confirmController = require('../controllers/confirmController');
var isRegistered = require('../middlewares/isRegistered');

console.log('in confirm.js');
/* GET login page. */
router.get('/', isRegistered, confirmController);


router.post('/', isRegistered, confirmController);

module.exports = router;
