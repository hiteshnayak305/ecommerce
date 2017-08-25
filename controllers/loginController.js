module.exports = function(req, res, next) {
    console.log('in loginController.js');
    if (req.session.user) {
        res.redirect('/dashboard');
    } else {
        res.render('login', {
            title: 'Login',
            error: req.flash("error"),
            success: req.flash("success")
        });
    }
}
