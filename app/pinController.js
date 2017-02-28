var Pin = require("./models/pin.js"),
    mongoose = require("mongoose");
    
function managePins() {
    
    this.newPin = function(request, response, title, url, owner) {
        var newPin = new Pin();
        newPin.title = title;
        newPin.imageUrl = url;
        newPin.user = owner;
        newPin.likes = 0;
        newPin.save(function(error) {
            if (error) throw error;
            response.redirect('/profile');
        });
    };
    
    this.allPins = function(request, response) {
        Pin.find({}, function(error, pins) {
            if (error) throw error;
            response.json(pins);
        });
    };
    
    this.userPins = function(request, response, user) {
        Pin.find({user : user}, function(error, pins) {
            if (error) throw error;
            response.json(pins);
        });
    };
    
    this.removePin = function(request, response, id) {
        Pin.findById(id, function(error, pin) {
            if (error) throw error;
            pin.remove();
            response.json('Pin deleted');
        });
    };
    
    this.addLike = function(request, response, id) {
        Pin.findById(id, function(error, pin) {
            if (error) throw error;
            pin.likes = pin.likes += 1;
            pin.save(function(error) {
                if (error) throw error;
            });
            response.json(pin.likes);
        });
    };
    
    this.removeLike = function(request, response, id) {
        Pin.findById(id, function(error, pin) {
            if (error) throw error;
            pin.likes = pin.likes -= 1;
            pin.save(function(error) {
                if (error) throw error;
            });
            response.json(pin.likes);
        });
    };
}

module.exports = managePins;