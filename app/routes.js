

module.exports = function(app, passport) {
    // index
    app.route('/')
        .get(function(request, response) {
            response.sendFile(process.cwd() + '/public/index.html');
        });
        
    // login
    app.route('/login')
        .post(passport.authenticate('local-login', {
            successRedirect : '/profile',
            failureRedirect : '/',
            failureFlash : true
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
        
    // profile
    app.route('/profile')
        .get(isLoggedIn, function(request, response) {
            response.sendFile(process.cwd() + '/public/profile.html');
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
