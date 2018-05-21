module.exports = function(mongoose)
{
    var PetSchema = new mongoose.Schema(
        {name:{type:String, minlength:[3, "Your pets name must be longer than 3 characters"], required:[true, "Your pet needs a name"]},
        type:{type:String, required:[true, "You must give the type of pet"], minlength:[3, "Your pets type must be longer than 3 characters"]},
        description:{type:String,required:[true, "You must give your pet a description"], minlength:[3, "Your pets description must be longer than 3 characters"]},
        likes:Number,
        skills:[String],
        dateCreated:Date, 
        dateUpdated:Date});
    mongoose.model('Pet', PetSchema);   
    return mongoose.model("Pet");
}