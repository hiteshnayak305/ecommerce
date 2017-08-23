module.exports = function(req, res, next) {
    res.render('index', {
        title: 'Login'
    });
}
