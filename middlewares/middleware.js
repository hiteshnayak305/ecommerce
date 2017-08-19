module.exports = {
    formHandler: function(req, res, next){
      //col-md-offset-0
      next();
    }
}

//how used
//example middleware
var middleware = require('../middlewares/middleware');

/* GET home page. */
router.get('/',[middleware['formHandler'],function(req, res, next) {
  res.render('index', { title: 'Express' });
}
]
 );

module.exports = router;
