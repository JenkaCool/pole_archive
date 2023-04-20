const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors")

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
}

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extend: true}));

const db = require('./models');



db.sequelize.sync();
/*
// force: true will drop the table if it already exists
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
});
*/
app.get("/", (req, res) => {
  res.json({ message:"Welcome!"});
});

//
//
//
require('./routes/document.route.js')(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});