var mongoose = require("mongoose");

var pinSchema = mongoose.Schema({
    title : String,
    imageUrl : String,
    likes : Number,
    user : String
});

module.exports = mongoose.model('Pin', pinSchema);