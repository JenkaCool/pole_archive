from flask import Flask, request, abort, jsonify, session
#from flask_mysqldb import MySQL
from datetime import datetime
import json
from decimal import Decimal
from flask_session import Session
import hashlib
from hashlib import md5
import bcrypt
from models import *
from view import *
from models import db
from view import ma
#from config import ApplicationConfig

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/PolE_archive'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = r"jashdRAS123dshsh234jfg3sa4sddarrrr!31"

SESSION_TYPE = 'filesystem'
app.config.from_object(__name__)
Session(app)

db.init_app(app)
ma.init_app(app)

#with app.app_context():
#  db.create_all()

def morph_dec(obj):
    if isinstance(obj, Decimal):
        return str(obj)
    raise TypeError("Object of type '%s' is not JSON serializable" % type(obj).__name__)

def getSalt():
  return bcrypt.gensalt()
  # will be 29 chars

def hashPassword(password, salt):
  m = md5(salt)
  m.update(password.encode('utf8'))
  pwd = m.hexdigest()
  return pwd

def checkPassword(password, salt):
  m = md5(salt.encode('utf8'))
  m.update(password.encode('utf8'))
  pwd = m.hexdigest()
  return pwd


@app.route('/api/')
def home():
    return "Hello"

@app.route('/api/documents/', methods=['GET'])
def documents():
    if not session.get('user_id'):
      abort(404)
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
        incomes = Income.query.filter(Income.exl_id == exile.get_exile_id()).all()
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
    if not session.get('user_id'):
      abort(404)
    if request.method == 'GET':
      temp = {}
      json_data=[]
      records_temp = []
      document_schema = DocumentSchema()
      record_schema = RecordSchema()

      document = Document.query.filter(Document.doc_id == id).one()


      records = Record.query.filter(Record.doc_id == id).all()

      for record in records:
        temp = {}
        record_temp = []
        record_temp = record_schema.dump(record)
        records_temp.append(record_temp)

      temp['records'] = records_temp
      json_data = temp

      temp['document'] = document_schema.dump(document)
    return json.dumps(json_data)

@app.route('/api/exiles/view/<id>', methods=['GET','POST'])
def one_exile(id):
    if request.method == 'GET':
      json_data=[]

      exile_schema = ExileSchema()
      income_schema = IncomeSchema()

      temp = {}
      income_temp = []
      incomes = []

      exile = Exile.query.filter_by(exl_id = id).one()

      incomes = Income.query.filter(Income.exl_id == exile.get_exile_id()).all()
      if (incomes is None):
        incomes = ''
      else:
        for income in incomes:
          income_temp.append(income_schema.dump(income))

      exile_temp = exile_schema.dump(exile)
      temp['exile'] = exile_temp
      temp['incomes'] = income_temp
      json_data = temp

    return json.dumps(json_data, default=morph_dec)

@app.route('/api/documents/add/', methods=['POST'])
def document_add():
    if not session.get('user_id'):
      abort(404)

    if request.method == 'POST':
      year = request.json["year"]
      fund = request.json["fund"]
      inventory = request.json["inventory"]
      storage_unit = request.json["storage_unit"]
      total_lists_num = request.json["total_lists_num"]
      additional_info = request.json["additional_info"]
      url = request.json["url"]
      creator_id = request.json["creator_id"]
      date = request.json["date"]
      visible_mode = request.json["visible_mode"]

      document = Document(doc_fund = fund, doc_inventory = inventory, doc_storage_unit = storage_unit, doc_total_lists_num = total_lists_num, doc_year = year, doc_additional_info = additional_info, doc_url = url, doc_creator_id = creator_id, doc_creating_date = date, doc_visible_mode = visible_mode)
      try:
        db.session.add(document)
        db.session.commit()
        return "Document was added"
      except:
        db.session.rollback()
        return "An error occurred while adding"

@app.route('/api/signup/', methods=['POST'])
def user_add():
    if request.method == 'POST':
      username = request.json["username"]
      role = request.json["role"]
      email = request.json["email"]
      salt = getSalt()
      hashed_password = hashPassword(request.json["password"], salt)
      cur_date = request.json["date"]
      username_exists = User.query.filter_by(usr_username = username).first() is not None
      email_exists = User.query.filter_by(usr_email = email).first() is not None

      if username_exists:
          return jsonify({"error" : "Username already used"}), 409

      if email_exists:
          return jsonify({"error" : "Email already used"}), 409

      user = User(usr_username=username, usr_email=email, usr_hashed_password=hashed_password, usr_salt=salt, usr_registration_date=cur_date)
      try:
        db.session.add(user)
        db.session.commit()
        return jsonify({
           "id": user.usr_id,
           "username": user.usr_username,
           "role": user.usr_role,
           "email": user.usr_email,
        })
      except:
        db.session.rollback()
        return "An error occurred while adding"

@app.route('/api/login/', methods=['POST'])
def user_login():
    if request.method == 'POST':
      username = request.json["username"]
      password = request.json["password"]

      user = User.query.filter(User.usr_username == username).first()

      if user is None:
          return jsonify({"error" : "User or password incorrect"}), 401

      print(user)
      print(password)
      print(user.usr_hashed_password)
      print(checkPassword(password, user.usr_salt))
      if not (user.usr_hashed_password == checkPassword(password, user.usr_salt)):
          return jsonify({"error" : "User or password incorrect"}), 401

      session['user_id'] = user.usr_id
      session['username'] = user.usr_username
      session['role'] = user.usr_role
      session['email'] = user.usr_email
      session['reg_date'] = user.usr_registration_date

      return jsonify({
         "id": user.usr_id,
         "username": user.usr_username,
         "role": user.usr_role,
         "email": user.usr_email,
      })

@app.route('/api/profile/', methods=['GET'])
def user_profile():
    user_id = session.get("user_id")
    if not user_id:
      return jsonify({"error" : "Unauthorized"}), 401

    username = session.get("username")
    role = session.get("role")
    email = session.get("email")
    date = session.get("reg_date")

    return jsonify({
       "id": user_id,
       "username": username,
       "role": role,
       "email": email,
       "date": date,
    })

@app.route('/api/logout/', methods=['GET'])
def user_logout():
    session.pop('username', None)
    return jsonify({"User logout"})


if __name__ == '__main__':
    app.run(host="127.0.0.1", port="5000", debug=True)