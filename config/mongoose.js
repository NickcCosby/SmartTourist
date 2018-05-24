module.exports = function()
{
    var mongoose = require("mongoose");
    require('../models/user.js')
    mongoose.connect('mongodb://localhost/SmartTourist');
    mongoose.Promise = global.Promise;
    return mongoose;
}