module.exports = app => {
    const documents = require("../controllers/documents.controller.js");

    app.post("/new-document", documents.create);

    app.get("/documents", documents.findAll);
  /*
    app.get("/document/:documentId", documents.findOne);

    app.put("/document/:documentId", documents.update);

    app.delete("/document/:documentId", documents.delete);

    app.delete("/documents", documents.deleteAll);
  */
};