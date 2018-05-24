var path = require("path");
module.exports = function(mongoose)
{
    const User = require("../models/user.js")(mongoose);
    return {
        index: async function(req, res)
        {
            res.sendFile(path.resolve("./SmartTourist/dist/SmartTourist/index.html"));
        },
        readAll: async function(req, res)
        {
            User.find({})
            .then(users => {
                res.json({msg: "Success", users: users})
            })
            .catch(err => {
                res.json({msg: "Error", error: err})
            })
        },
        readOne: async function(req, res)
        {
            User.findOne({"user_id":req.params.id})
            .then(user => {
                res.json({msg: "Success", user: user})
            })
            .catch(err => {
                res.json({msg: "Error", error: err})
            })
        },
        create: async function(req, res)
        {
            var newUser = new User({
                name: req.body.name, 
                user_id: req.body.user_id
            })
            newUser.save()
            .then(user => {
                res.redirect('/users/' + user.user_id)
            })
            .catch(err => {
                res.json({msg: "Error", error: err})
            })
        },
        update: async function(req, res){
            User.findOneAndUpdate({"user_id":req.params.id},{
                $push: {
                    places_visited: req.body.place
                }
            })
            .then(user => {
                res.redirect(303, '/users/' + user.user_id)
            })
            .catch(err => {
                res.json({msg: "Error", error: err})
            })
        },
        delete: async function(req, res){
            User.remove({"user_id":req.params.id})
            .then(user => {
                res.redirect(303, '/users')
            })
            .catch(err => {
                res.json({msg: "Error", error: err})
            })
        }
    }
}
