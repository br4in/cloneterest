var mongoose = require("mongoose"),
    bcrypt = require("bcrypt-nodejs");
    
var userSchema = mongoose.Schema({
    local : {
        email : String,
        password : String
    },
    twitter : {
        id : String,
        token : String,
        displayName : String,
        username : String
    }
});

// generate hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// check if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password); 
};

module.exports = mongoose.model('User', userSchema);
