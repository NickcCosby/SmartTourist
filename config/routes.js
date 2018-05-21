module.exports = function(app, mongoose)
{
    var mains = require("../controllers/main.js")(mongoose);
    app.get('/petsapi', mains.showPets);
    app.post("/petsapi", mains.newPet);
    app.put("/petsapi/:id", mains.updatePet);
    app.delete("/petsapi/:id", mains.removePet);
    app.get("/petsapi/:id", mains.showPet);
    app.get("*", mains.index);
}        