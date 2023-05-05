from flask import Flask, request, abort, jsonify
#from flask_mysqldb import MySQL
from sqlalchemy.dialects.mysql import TINYINT
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import json
from flask_marshmallow import Marshmallow
from decimal import Decimal

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

  def get_id(self):
      return self.exl_id


class Income(db.Model):
  __tablename__ = 'tblincome'
  inc_id = db.Column(db.Integer, primary_key=True)
  exl_id = db.Column(db.Integer, nullable=False)
  inc_amount = db.Column(db.Float(20,2), nullable=True)
  inc_currency = db.Column(db.String(50), nullable=True)
  inc_source = db.Column(db.String(500), nullable=True)
  inc_reason = db.Column(db.Text, nullable=False)
  inc_period = db.Column(db.String(100), nullable=True)

  def __repr__(self):
      return '<Income %r>' % self.exl_id


class DocumentSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Document
        load_instance = True


class ExileSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Exile
        load_instance = True


class IncomeSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Income
        load_instance = True


def morph_dec(obj):
    print(obj)
    if isinstance(obj, Decimal):
        return str(obj)
    raise TypeError("Object of type '%s' is not JSON serializable" % type(obj).__name__)


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
      income_schema = IncomeSchema()

      exiles = Exile.query.all()

      for exile in exiles:
        temp = {}
        exile_temp=[]
        income_temp = []
        incomes = []
        incomes = Income.query.filter(Income.exl_id == exile.get_id()).all()
        if (incomes is None):
          incomes = ''
        else:
          for income in incomes:
            income_temp.append(income_schema.dump(income))
            #income_temp.append(income_schema.dumps(income))

        exile_temp = exile_schema.dump(exile)
        temp['exile'] = exile_temp
        temp['incomes'] = income_temp
        json_data.append(temp)

    print(json_data)
    return json.dumps(json_data, default=morph_dec)


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