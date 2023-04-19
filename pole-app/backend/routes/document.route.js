module.exports = function(app) {

    const customers = require('../controllers/document.controller.js');

    // Create a new Customer
    app.post('/api/documents', customers.create);

    // Retrieve all Customer
    app.get('/api/documents', customers.findAll);

    // Retrieve a single Customer by Id
    app.get('/api/document/:customerId', customers.findById);

    // Update a Customer with Id
    app.put('/api/document/:customerId', customers.update);

    // Delete a Customer with Id
    app.delete('/api/document/:customerId', customers.delete);
}