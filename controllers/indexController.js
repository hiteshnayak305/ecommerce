module.exports = function(req, res, next) {
    console.log('in indexController.js');
    res.render('index', {
        title: 'Express',
        error: req.flash("error"),
        success: req.flash("success")
    });
}
