var User = require('../models/User');

module.exports = function doConfirm(req, res, next) {
    console.log('in doConfirm.js');

    var email = req.query.email;
    var active_link = req.query.active_link;
    console.log('email:' + email);
    console.log('link:' + active_link);

    User.update({
        'local.email': email,
        'local.active_hash': active_link
    }, {
        'local.status': 'active'
    }, function(err, result) {
        if (err) {
            req.flash('error', 'an error occured');
        }
        console.log(result);
        if (result.nMatched == 0) {
            req.flash('error', 'wrong hash code resend email');
            res.redirect('/resendmail');
        } else {
            if (result.nModified == 0) {
                req.flash('error', 'user already cinfirmed login');
            } else {
                req.flash('success', 'user confirmed successfully');
            }
            next();
        }

    })
}
