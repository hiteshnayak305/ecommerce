// route middleware to make sure a user is logged in
module.exports = function isLoggedIn(req, res, next) {
    console.log('in isLoggedIn.js');

    // if user is authenticated in the session, carry on
    if (req.session.user)
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
