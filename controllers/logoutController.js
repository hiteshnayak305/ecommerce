module.exports = function(req, res, next) {
    //req.logOut();   //Not working
    if (req.session.destroy()) { //true: if destroyed
        res.redirect('/');
    }
}
