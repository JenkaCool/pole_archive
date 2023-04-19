
const Document = function(document) {
    this.fund = documents.doc_fund;
    this.inventory = documents.doc_inventory;
    this.storage_unit = documents.doc_storage_unit;
    this.total_lists_num = documents.doc_total_lists_num;
    this.year = documents.doc_year;
    this.additional_info = documents.doc_additional_info;
    this.url = documents.doc_url;
    this.creator_id = documents.doc_creator_id;
    this.is_removed = documents.doc_is_removed;
    this.visible_mode = documents.doc_visible_mode;
};

//Creating document
Document.create = (newDocument, result) => {
    sql.query("INSERT INTO TODO SET ?", newDocument, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

    console.log("Дело сделано", { id: res.insertId, ...newDocument });
    result(null, { id: res.insertId, ...newDocument });
    });
};

//Finding document
Document.findById = (documentId, result) => {
    sql.query(`SELECT * FROM tbldocument WHERE id = ${documentId}`, (err, res) => {
    if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
    }

    if (res.length) {
    console.log("найдено: ", res[0]);
    result(null, res[0]);
    return;
    }

    result({ kind: "not_found" }, null);
    });
};


//Finding document
Document.findByYear = (curYear, result) => {
  sql.query(`SELECT * FROM tbldocument WHERE doc_year = '${curYear}'`, (err, res) => {

    if (res.length) {
      console.log("найдено дело: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};



//Getting all documents
Document.getAll = result => {
    sql.query("SELECT * FROM tbldocument", (err, res) => {
    if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
    }

    console.log("documents: ", res);
    result(null, res);
    });
};

//Updating document
Document.updateById = (id, document, result) => {
    sql.query(
        "UPDATE tbldocument SET doc_year =? WHERE id =? ",
        [document.doc_year, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("Обновлено", { id: id, ...document });
            result(null, { id: id, ...document });
        }
    );
};

//Remove document
Document.remove = (id, result) => {
    sql.query("DELETE FROM tbldocument WHERE id =? ", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // если дело не удалось получить по id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Удален документ с id = ", id);
        result(null, res);
    });
};

//Remove all documents
Document.removeAll = result => {
    sql.query("DELETE FROM tbldocument", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} documents`);
        result(null, res);
    });
};