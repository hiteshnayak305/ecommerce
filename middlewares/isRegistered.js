var User = require('../models/User');
// route middleware to make sure a user is logged in
module.exports = function isRegistered(req, res, next) {
    console.log('in isRegistered.js');

    // if user is authenticated in the session, carry on
    User.findOne({
        'local.email': req.query.email
    }, function(err, user) {
        if (user) {
            return next();
        } else {
            // if they aren't redirect them to the home page
            console.log('user not registered');
            req.flash('error', 'User not registered');
            res.redirect('/signup');
        }
    })


}
