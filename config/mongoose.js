module.exports = function()
{
    var mongoose = require("mongoose");
    mongoose.connect('mongodb://localhost/PetShelter');
    mongoose.Promise = global.Promise;
    return mongoose;
}