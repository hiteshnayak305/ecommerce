var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var engine = require('ejs-locals');
var session = require('express-session');
var morgan = require('morgan');

var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var config = require('./config/config');

var app = express();

mongoose.connect(config.development.database.connection.url, {
    useMongoClient: true
});

require('./config/passport')(passport);

// view engine setup
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//app.use(morgan('dev')); //log every request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// sessions for passport
app.use(session({
    secret: 'secretekeyishere',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//routes
require('./routes/routes')(app, passport);

module.exports = app;
