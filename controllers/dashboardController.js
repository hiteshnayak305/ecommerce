module.exports = function(req, res, next) {
    res.render('dashboard', {
        title: 'Dashboard',
        email: req.session.user.local.email,
    });
}
