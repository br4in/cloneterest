var express = require("express"),
    app = express(),
    port = process.env.PORT || 8080,
    mongoose = require("mongoose"),
    passport = require("passport"),
    flash = require("connect-flash"),
    bodyParser = require("body-parser"),
    session = require("express-session"),
    path = require("path");

// mongoose configuration
var configDB = require("./config/database.js");
mongoose.connect(configDB.url);

// passport configuration
require("./config/passport.js")(passport);

// middlewares
app.use(bodyParser());
app.use(express.static(path.join(__dirname + '/public')));
app.use('/css', express.static(path.join(__dirname + '/public/css')));
app.use(session({secret : 'mysecretpass'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// routes configuration
require("./app/routes.js")(app, passport);

app.listen(port, function() {
    console.log('The magic happens on port ' + port);
});
