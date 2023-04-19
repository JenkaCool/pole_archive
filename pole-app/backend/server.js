const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Это стартовая страница нашего приложения" });
});

app.listen(3001, () => {
  console.log("Сервер запущен на 3001 порту");
});

require("./routes/documents.routes.js")(app);