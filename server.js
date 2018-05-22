var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(express.static(__dirname + "/SmartTourist/dist/SmartTourist"));
<<<<<<< HEAD

=======
app.set('views', __dirname + "/../client/views");
app.set('view engine', 'ejs');
>>>>>>> FrontEnd
app.use(bodyParser.json());
const mongoose = require('./config/mongoose.js')();
var logger = function(req, res, next)
{
	console.log("request onto: "+req.originalUrl);
	next();
}
app.use(logger);
require('./config/routes.js')(app, mongoose)

const server = app.listen(8000, function()
{
	console.log("listening on port 8000");
});
