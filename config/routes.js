module.exports = function(app, mongoose)
{
    var mains = require("../controllers/main.js")(mongoose);
    app.get('/users', mains.readAll)
    app.get('/users/:id', mains.readOne)
    app.post('/users', mains.create)
    app.put('/users/:id', mains.update)
    app.delete('/users/:id', mains.delete)
    app.all("*", mains.index)
}        