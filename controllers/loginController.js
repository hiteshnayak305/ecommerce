module.exports = function(req, res, next) {
    if (req.session.user) {
        res.redirect('/dashboard');
    } else {
        res.render('login', {
            title: 'Login'
        });
    }
}
