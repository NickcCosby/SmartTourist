var path = require("path");
module.exports = function(mongoose)
{
    const User = require("../models/user.js")(mongoose);
    return {
        index: async function(request, response)
        {
            response.sendFile(path.resolve("./SmartTourist/dist/SmartTourist/index.html"));
        },
        
    }
}
