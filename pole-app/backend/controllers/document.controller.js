const db = require('../models');
const Document = db.documents;
const Op = db.Sequelize.Op;


// Post a Document
exports.create = (req, res) => {
  if (!req.body.year) {
    res.status(400).send({
      message: "Year can not be empty!"
    });
    return;
  }

  const document = {
    id : req.body.doc_id,
    fund : req.body.doc_fund,
    inventory : req.body.doc_inventory,
    storage_unit : req.body.doc_storage_unit,
    total_lists_num : req.body.doc_total_lists_num,
    year : req.body.doc_year,
    additional_info : req.body.doc_additional_info,
    url : req.body.doc_url,
    creator_id : req.body.doc_creator_id,
    creation_date : req.body.doc_creation_date,
    is_removed : req.body.doc_is_removed,
    visible_mode : req.body.doc_visible_mode
  };

  Document.create(document)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Document."
      });
    });
};

// FETCH all Documents
exports.findAll = (req, res) => {
  Document.findAll({ })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving documents."
    });
  });
};

// Find a Document by Id
exports.findById = (req, res) => {
  const curId = req.params.doc_id;

  Document.findByPk(curId)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Document with id=" + curId
      });
    });
};

// Update a Document
exports.update = (req, res) => {
  const curId = req.params.doc_id;

  Document.update(req.body, {
    where: { id: curId}
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Document was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Document with id=${curId}. Maybe Document was not found or req.body is empty.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Document with id = " + curId
      });
    });
};

// Delete a Document by Id
exports.delete = (req, res) => {
  const curId = req.params.doc_id;

  Document.destroy({
    where: { id: curId}
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Document was deleted successfully."
        });
      } else {
        res.send({
          message: `Cannot delete Document with id=${curId}. Maybe Document was not found.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Document with id = " + curId
        });
      });
};

// Delete aa Documents from the database
exports.deleteAll = (req, res) => {
  Document.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({
          message: `${nums} Documents were deleted successfully.`
          });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Documents."
        });
      });
};


// Find all visible Document for all users
exports.findAllPublic = (req, res) => {
  const curId = req.params.doc_id;

  Document.findAll({
    where: { visible_mode: 1 }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving documents"
      });
    });
};