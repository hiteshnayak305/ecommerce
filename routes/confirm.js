var express = require('express');
var router = express.Router();

var confirmController = require('../controllers/confirmController');
var isRegistered = require('../middlewares/isRegistered');
var doConfirm = require('../middlewares/doConfirm');

console.log('in confirm.js');
/* GET login page. */
router.get('/', isRegistered, doConfirm, confirmController);


router.post('/', isRegistered, doConfirm, confirmController);

module.exports = router;
