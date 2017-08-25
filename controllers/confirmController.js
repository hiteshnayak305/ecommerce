var User = require('../models/User');

module.exports = function(req, res, next) {
    console.log('in confirmController.js');

    var email = req.query.email;
    var active_link = req.query.active_link;
    console.log('email:' + email);
    console.log('link:' + active_link);


    res.render('login', {
        title: 'Login',
    });
}
