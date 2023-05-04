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
  doc_creator_id = db.Column(db.Integer, nullable=False, default=0)
  doc_creating_date = db.Column(db.DateTime, default=datetime.utcnow)
  doc_is_removed = db.Column(TINYINT(1, unsigned=True), nullable=False, default=0)
  doc_visible_mode = db.Column(db.Integer, nullable=False, default=0)

  def __repr__(self):
      return '<Document %r>' % self.doc_id

db.Column(db.Integer, nullable=True)
db.Column(db.Text, nullable=True)


class Exile(db.Model):
  __tablename__ = 'tblexile'
  exl_id = db.Column(db.Integer, primary_key=True)
  exl_full_name = db.Column(db.String(255), nullable=False)
  exl_gender = db.Column(db.String(8), nullable=False)
  exl_rank = db.Column(db.String(150), nullable=True)
  exl_province = db.Column(db.String(100), nullable=True)
  exl_order_num = db.Column(db.String(1000), nullable=True)
  exl_order_date = db.Column(db.String(1000), nullable=True)
  exl_order_info = db.Column(db.Text, nullable=True)
  exl_steward = db.Column(db.Text, nullable=True)
  exl_order_reason = db.Column(db.Text, nullable=False)
  exl_supervision_start_date = db.Column(db.String(50), nullable=True)
  exl_supervision_place = db.Column(db.String(70), nullable=True)
  exl_departure_place = db.Column(db.String(70), nullable=True)
  exl_income_flag = db.Column(TINYINT(1, unsigned=True), nullable=False, default=0)
  exl_mar_status = db.Column(db.String(100), nullable=True)
  exl_family_info = db.Column(db.Text, nullable=True)
  exl_cur_state = db.Column(db.Text, nullable=True)
  exl_add_info = db.Column(db.Text, nullable=True)
  exl_creator_id = db.Column(db.Integer, nullable=False, default=0)
  exl_creating_date = db.Column(db.DateTime, default=datetime.utcnow)
  exl_is_removed = db.Column(TINYINT(1, unsigned=True), nullable=False, default=0)
  exl_visible_mode = db.Column(db.Integer, nullable=False, default=0)

  def __repr__(self):
      return '<Exile %r>' % self.exl_id



class SetEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, set):
            return list(obj)
        return json.JSONEncoder.default(self, obj)

class DocumentSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Document
        load_instance = True

class ExileSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Exile
        load_instance = True

@app.route('/api/')
def home():
    return "Hello"

@app.route('/api/documents/', methods=['GET'])
def documents():
    if request.method == 'GET':
      json_data=[]
      document_schema = DocumentSchema()
      documents = Document.query.all()
      #row_headers = ["id", "fund", "inventory", "storage_unit", "total_lists_num", "year", "additional_info", "url", "creator_id", "creating_date", "is_removed", "visible_mode"]
      for doc in documents:
        json_data.append(document_schema.dump(doc))

    return json.dumps(json_data)


@app.route('/api/exiles/', methods=['GET'])
def exiles():
    if request.method == 'GET':
      json_data=[]
      exile_schema = ExileSchema()
      exiles = Exile.query.all()
      for exile in exiles:
        json_data.append(exile_schema.dump(exile))

    return json.dumps(json_data)


@app.route('/api/documents/view/<id>', methods=['GET','POST'])
def one_document(id):
    if request.method == 'GET':
      json_data=[]
      document_schema = DocumentSchema()
      doc = Document.query.filter_by(doc_id = id).one()
      json_data = document_schema.dump(doc)

    return json.dumps(json_data)


@app.route('/api/documents/add/', methods=['POST'])
def document_add():
    if request.method == 'POST':
      fund = request.json["fund"]
      inventory = request.json["inventory"]
      storage_unit = request.json["storage_unit"]
      total_lists_num = request.json["total_lists_num"]
      year = request.json["year"]
      additional_info = request.json["additional_info"]
      url = request.json["url"]
      creator_id = request.json["creator_id"]
      visible_mode = request.json["visible_mode"]

      document = Document(doc_id = id, doc_fund = fund, doc_inventory = inventory, doc_storage_unit = storage_unit, doc_total_lists_num = total_lists_num, doc_year = year, doc_additional_info = additional_info, doc_url = url, doc_creator_id = creator_id, doc_creating_date = creating_date, doc_is_removed = is_removed, doc_visible_mode = visible_mode)
      try:
        db.session.add(document)
        db.session.commit()
      except:
        db.session.rollback()
        return "An error occurred while adding"

if __name__ == '__main__':
    app.run(host="127.0.0.1", port="5000", debug=True)