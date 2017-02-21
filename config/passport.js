var LocalStrategy = require("passport-local").Strategy,
    User = require("../app/models/user.js");
    
module.exports = function(passport) {
    
    // serialize and deserialize user
    passport.serializeUser(function(user, done) {
        return done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(error, user) {
            done(error, user);
        });
    });
    
    // signup
    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(request, email, password, done) {
        process.nextTick(function() {
            User.findOne({'local.email' : email}, function(error, user) {
                if (error) throw error;
                if (user) {
                    return done(null, false);
                } else {
                    // create new user
                    var newUser = new User();
                    // set credentials
                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password);
                    // save it to db
                    newUser.save(function(error) {
                        if (error) throw error;
                        return done(null, newUser);
                    });
                }
            });
        });
    }));
    
    // login
    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(request, email, password, done) {
        User.findOne({'local.email' : email}, function(error, user) {
            if (error) throw error;
            if (!user) {
                // user not found
                return done(null, false);
            }
            if (!user.validPassword(password)) {
                // wrong password
                return done(null, false);
            }
            return done(null, user);
        });
    }));
    
};
