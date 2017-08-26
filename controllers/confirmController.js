var User = require('../models/User');

module.exports = function(req, res, next) {
    console.log('in confirmController.js');

    res.render('login', {
        title: 'Login',
        error: req.flash('error'),
        success: req.flash('success')
    });
}
