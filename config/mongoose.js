module.exports = function()
{
    var mongoose = require("mongoose");
    mongoose.connect('mongodb://localhost/SmartTourist');
    mongoose.Promise = global.Promise;
    return mongoose;
}