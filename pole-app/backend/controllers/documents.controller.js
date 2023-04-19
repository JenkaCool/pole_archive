const Document = require("../models/documents.model.js");

//Exporting and saving document
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
        message: "У нас не может не быть контента"
        });
    }

    const document = new Document({
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
    });

    Document.create(document, (err, data) => {
        if (err)
            res.status(500).send({
            message:
            err.message || "Произошла ошибка во время выполнения кода"
        });
        else res.send(data);
    });
};


exports.findAll = (req, res) => {
    Document.findAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                err.message || "Что-то случилось во время получения всех пользователей"
            });
        else
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
            res.send(data);
    });
};