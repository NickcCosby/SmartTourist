module.exports = function(app, mongoose)
{
    var mains = require("../controllers/main.js")(mongoose);
    app.get("*", mains.index);
}        