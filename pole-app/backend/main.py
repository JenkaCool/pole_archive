from flask import Flask, request, abort, jsonify
#from flask_mysqldb import MySQL
from sqlalchemy.dialects.mysql import TINYINT
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import json
from flask_marshmallow import Marshmallow

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/PolE_archive'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

class Document(db.Model):
  __tablename__ = 'tbldocument'
  doc_id = db.Column(db.Integer, primary_key = True)
  doc_fund = db.Column(db.String(100), nullable=True)
  doc_inventory = db.Column(db.String(100), nullable=True)
  doc_storage_unit = db.Column(db.String(100), nullable=True)
  doc_total_lists_num = db.Column(db.Integer, nullable=True)
  doc_year = db.Column(db.Integer, nullable=False)
  doc_additional_info = db.Column(db.Text, nullable=True)
  doc_url = db.Column(db.Text, nullable=True)
  doc_creator_id = db.Column(db.Integer, nullable=False)
  doc_creating_date = db.Column(db.DateTime, default=datetime.utcnow)
  doc_is_removed = db.Column(TINYINT(1, unsigned=True), nullable=False)
  doc_visible_mode = db.Column(db.Integer, nullable=False)

  def __repr__(self):
      return '<Document %r>' % self.doc_id

  def __init__(self, id, fund, inventory, storage_unit, total_lists_num, year, additional_info, url, creator_id, creating_date, is_removed, visible_mode):
      self.doc_id = id
      self.doc_fund = fund
      self.doc_inventory = inventory
      self.doc_storage_unit = storage_unit
      self.doc_total_lists_num = total_lists_num
      self.doc_year = year
      self.doc_additional_info = additional_info
      self.doc_url = url
      self.doc_creator_id = creator_id
      self.doc_creating_date = creating_date
      self.doc_is_removed = is_removed
      self.doc_visible_mode = visible_mode

class SetEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, set):
            return list(obj)
        return json.JSONEncoder.default(self, obj)

class DocumentSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Document
        load_instance = True

@app.route('/api/')
def home():
    return "Hello"

@app.route('/api/documents/', methods=['GET','POST'])
def documents():
    if request.method == 'GET':
      json_data=[]
      document_schema = DocumentSchema()
      documents = Document.query.all()
      #row_headers = ["id", "fund", "inventory", "storage_unit", "total_lists_num", "year", "additional_info", "url", "creator_id", "creating_date", "is_removed", "visible_mode"]
      for doc in documents:
        json_data.append(document_schema.dump(doc))

    return json.dumps(json_data)


@app.route('/api/exiles/', methods=['GET','POST'])
def exiles():
    if request.method == 'GET':
        documents = Document.query.all()
        return jsonify(data)

if __name__ == '__main__':
    app.run(host="127.0.0.1", port="5000", debug=True)