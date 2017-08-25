module.exports = function(req, res, next) {
    console.log('in dashboardController.js');
    res.render('dashboard', {
        title: 'Dashboard',
        error: req.flash("error"),
        success: req.flash("success"),
        email: req.session.user.local.email
    });
}
