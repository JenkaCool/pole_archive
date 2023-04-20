module.exports = app => {
    const documents = require('../controllers/document.controller.js');

    var router = require("express").Router();

    // Create a new Document
    router.post('/documents', documents.create);

    // Retrieve all Document
    router.get('/documents', documents.findAll);

    // Retrieve a single Document by Id
    router.get('/document/:documentId', documents.findById);

    // Update a Document with Id
    router.put('/document/:documentId', documents.update);

    // Delete a Document with Id
    router.delete('/api/document/:documentId', documents.delete);

    app.use('/api/documents', router);
}