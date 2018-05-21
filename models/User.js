module.exports = function(mongoose)
{
    var UserSchema = new mongoose.Schema();//Needs to be designed
    mongoose.model('User', UserSchema);   
    return mongoose.model("User");
}