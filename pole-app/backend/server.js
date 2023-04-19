var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json())

const db = require('./config/db.config.js');

// force: true will drop the table if it already exists
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
});

require('./routes/document.route.js')(app);

// Create a Server
var server = app.listen(3001, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("App listening at http://%s:%s", host, port)
})