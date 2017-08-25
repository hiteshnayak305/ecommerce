var index = require('./index');
var login = require('./login');
var signup = require('./signup');
var dashboard = require('./dashboard');
var logout = require('./logout');
var confirm = require('./confirm');

module.exports = function(app, passport) {

    console.log('in routes.js');
    app.use('/', index);
    app.use('/login', login);
    app.use('/signup', signup);
    app.use('/dashboard', dashboard);
    app.use('/logout', logout);
    app.use('/confirm', confirm);

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handler
    app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });
}
