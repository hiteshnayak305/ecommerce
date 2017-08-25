module.exports = function(req, res, next) {
    console.log('in signupController.js');
    if (req.session.user) {
        res.redirect('/dashboard');
    } else {
        res.render('signup', {
            title: 'Signup',
            error: req.flash("error"),
            success: req.flash("success")
        });
    }
}
