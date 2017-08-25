var express = require('express');
var router = express.Router();

var indexController = require('../controllers/indexController');

console.log('in index.js');
/* GET home page. */
router.get('/', indexController);

router.post('/', function(req, res, next) {
    console.log('POST recieved @ index');
    res.redirect('/');
});

module.exports = router;
