var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User');
var bcrypt = require('bcrypt-nodejs');
var dateFormat = require('dateformat');

//expose this function to our app using module.exports
module.exports = function(passport) {
    console.log('in passport.js');

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize Users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    // used to deserialize the User
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses Username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {
            console.log('in local-signup');
            // asynchronous
            // User.findOne wont fire unless data is sent back
            process.nextTick(function() {

                // find a User whose email is the same as the forms email
                // we are checking to see if the User trying to login already exists
                User.findOne({
                    'local.email': email
                }, function(err, user) {
                    // if there are any errors, return the error
                    if (err) {
                        return done(err);
                    }

                    // check to see if theres already a User with that email
                    if (user) {
                        return done(null, false, req.flash('error', 'That email is already taken.'));
                    } else {
                        User.find().sort([
                            ['local._id', 'descending']
                        ]).limit(1).exec(function(err, Userdata) {

                            // if there is no User with that email
                            // create the User
                            var newUser = new User();

                            // set the User's local credentials

                            var date = dateFormat(Date.now(), "yyyy-mm-dd HH:MM:ss");

                            var active_code = bcrypt.hashSync(Math.floor((Math.random() * 99999999) * 54), null, null);

                            newUser.local.email = email;
                            newUser.local.password = newUser.generateHash(password);
                            newUser.local.username = req.body.username;
                            newUser.created_date = date;
                            newUser.updated_date = date;
                            newUser.local.status = 'inactive'; //inactive for email actiavators
                            newUser.local.active_hash = active_code;
                            if (Userdata[0]) {
                                newUser.local._id = Userdata[0].local._id + 1;
                            }

                            // save the User
                            newUser.save(function(err) {
                                if (err) {
                                    throw err;
                                }
                                //email validation
                                var email = require('../helpers/email/activate_email');
                                email.activate_email(req.body.username, req.body.email, active_code);
                                return done(null, newUser, req.flash('success', 'Account Created Successfully,Please Check Your Email For Account Confirmation.'));
                            });

                        });

                    }

                });

            });

        }));


    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses Username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {
            console.log('in local-login');
            // callback with email and password from our form
            // find a User whose email is the same as the forms email
            // we are checking to see if the User trying to login already exists
            User.findOne({
                'local.email': email
            }, function(err, user) {
                // if there are any errors, return the error before anything else
                if (err) {
                    return done(null, false, req.flash('error', err)); // req.flash is the way to set flashdata using connect-flash
                }
                // if no User is found, return the message
                if (!user) {
                    return done(null, false, req.flash('error', 'Sorry Your Account Not Exits ,Please Create Account.')); // req.flash is the way to set flashdata using connect-flash
                }
                // if the User is found but the password is wrong
                if (!user.validPassword(password)) {
                    return done(null, false, req.flash('error', 'Email and Password Does Not Match.')); // create the loginMessage and save it to session as flashdata
                }
                if (user.local.status === 'inactive') {
                    return done(null, false, req.flash('error', 'Your Account Not Activated ,Please Check Your Email')); // create the loginMessage and save it to session as flashdata
                }
                // all is well, return successful User
                req.session.user = user;

                return done(null, user);
            });

        }));

};
