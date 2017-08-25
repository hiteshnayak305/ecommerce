module.exports = function(req, res, next) {
    //req.logOut();   //Not working
    console.log('in logoutController.js');
    if (req.session.destroy()) { //true: if destroyed
        res.redirect('/');
    }
}
