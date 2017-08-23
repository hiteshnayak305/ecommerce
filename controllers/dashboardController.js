module.exports = function(req, res, next) {
    res.render('dashboard', {
        title: 'Dashboard'
    });
}
