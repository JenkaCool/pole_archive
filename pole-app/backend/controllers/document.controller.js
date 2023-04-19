const db = require('../config/db.config.js');
const Document = db.documents;

// Post a Document
exports.create = (req, res) => {
  Document.create({
    id : req.body.doc_id,
    fund : req.body.doc_fund,
    inventory : req.body.doc_inventory,
    storage_unit : req.body.doc_storage_unit,
    total_lists_num : req.body.doc_total_lists_num,
    year : req.body.doc_year,
    additional_info : req.body.doc_additional_info,
    url : req.body.doc_url,
    creator_id : req.body.doc_creator_id,
    is_removed : req.body.doc_is_removed,
    visible_mode : req.body.doc_visible_mode
  }).then(document => {
    res.send(document);
  });
};

// FETCH all Documents
exports.findAll = (req, res) => {
  Document.findAll().then(documents => {
    res.send(documents);
  });
};

// Find a Document by Id
exports.findById = (req, res) => {
  Document.findById(req.params.documentId).then(document => {
    res.send(document);
  })
};

// Update a Document
exports.update = (req, res) => {
  const id = req.params.documentId;
  Document.update( {
        id : req.body.doc_id,
        fund : req.body.doc_fund,
        inventory : req.body.doc_inventory,
        storage_unit : req.body.doc_storage_unit,
        total_lists_num : req.body.doc_total_lists_num,
        year : req.body.doc_year,
        additional_info : req.body.doc_additional_info,
        url : req.body.doc_url,
        creator_id : req.body.doc_creator_id,
        is_removed : req.body.doc_is_removed,
        visible_mode : req.body.doc_visible_mode
      },
      { where: {id: req.params.documentId} }
        ).then(() => {
        res.status(200).send("updated successfully a customer with id = " + id);
      });
};

// Delete a Document by Id
exports.delete = (req, res) => {
  const id = req.params.documentId;
  Document.destroy({
    where: { id: id }
  }).then(() => {
    res.status(200).send('deleted successfully a document with id = ' + id);
  });
};