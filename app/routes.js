var managePinsModule= require("./pinController.js");

module.exports = function(app, passport) {
    
    var managePins = new managePinsModule();
    
    // index
    app.route('/')
        .get(function(request, response) {
            response.sendFile(process.cwd() + '/public/index.html');
        });
        
    /* local login, twitter login and signup */
    app.route('/login')
        .get(function(request, response) {
            response.sendFile(process.cwd() + '/public/login.html');
        });
    
    app.route('/login')
        .post(passport.authenticate('local-login', {
            successRedirect : '/profile',
            failureRedirect : '/',
            failureFlash : true
        }));
    
    // twitter login
    app.route('/auth/twitter')
        .get(passport.authenticate('twitter-login'));
    // twitter callback
    app.route('/auth/twitter/callback')
        .get(passport.authenticate('twitter-login', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));
        
    // signup
    app.route('/signup')
        .post(passport.authenticate('local-signup', {
            successRedirect : '/profile',
            failureRedirect : '/',
            failureFlash : true
        }));
    
    // logout
    app.route('/logout')
        .get(function(request, response) {
            request.logout();
            response.redirect('/');
        });
        
    /* pages and data */
    app.route('/profile')
        .get(isLoggedIn, function(request, response) {
            response.sendFile(process.cwd() + '/public/profile.html');
        });
        
    app.route('/userData')
        .get(function(request, response) {
            /* return current user's data */
            var user = {};
            if (!request.user) {
                user.name = 'Guest';
            } else if (request.user.local) {
                user.name = request.user.local.email;
            } else if (request.user.twitter) {
                user.name = request.user.twitter.displayName;
            }
            response.json(user);
        });
        
    app.route('/newPin')
        .post(function(request, response) {
            var pinTitle = request.body.title,
                pinUrl = request.body.url,
                owner;
                if (request.user.local.email) {
                     owner = request.user.local.email;
                }  else {
                    owner = request.user.twitter.displayName;
                }
            managePins.newPin(request, response, pinTitle, pinUrl, owner);
        });
        
        
    app.route('/userPins')
        .get(function(request, response) {
            var user;
            if (request.user.local.email) {
                     user = request.user.local.email;
                }  else {
                    user = request.user.twitter.displayName;
                }
            managePins.userPins(request, response, user);
        });
        
    app.route('/allPins')
        .get(function(request, response) {
            managePins.allPins(request, response);
        });
        
    app.route('/removePin/:id')
        .get(function(request, response) {
            managePins.removePin(request, response, request.params.id);
        });
        
    /* Show other user's profile */
    app.route('/user/:user')
        .get(function(request, response) {
            response.sendFile(process.cwd() + '/public/user.html');
        });
    
    app.route('/userPins/:user')
        .get(function(request, response) {
            managePins.userPins(request, response, request.params.user);
        });
        
    app.route('/addLike/:id')
        .get(function(request, response) {
            managePins.addLike(request, response, request.params.id);
        });
        
    app.route('/removeLike/:id')
        .get(function(request, response) {
            managePins.removeLike(request, response, request.params.id);
        });
        
    // Make sure the user is logged in
    function isLoggedIn(request, response, next) {
        if (request.isAuthenticated()) {
            return next();
        } else {
            response.redirect('/');
        }
    }
    
};
