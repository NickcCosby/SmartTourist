module.exports = function(mongoose)
{
    var UserSchema = new mongoose.Schema({
        name: String,
        user_id: String,
        places_visited: {type: [String], default: []}
    }, {timestamps: true});
    var User = mongoose.model('User', UserSchema);   
    return User;
}