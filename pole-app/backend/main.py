from flask import Flask, request, abort, jsonify, session,make_response
#from flask_mysqldb import MySQL
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
import jwt
import os
from datetime import datetime, timedelta
from functools import wraps
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_jwt_identity,
    unset_jwt_cookies
)
from flask_jwt_extended import JWTManager

app = Flask(__name__)


app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/PolE_archive'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.urandom(24)

SESSION_TYPE = 'filesystem'
app.config.from_object(__name__)
Session(app)

db.init_app(app)
ma.init_app(app)

jwt = JWTManager(app)
#with app.app_context():
#  db.create_all()

"""
morphDec преобразует число в вид строки, который поддерживает сериализацию json.

:param obj: прередаваемое число
:return: преобразованое число в формате строки
"""
def morphDec(obj):
    if isinstance(obj, Decimal):
        return str(obj)
    raise TypeError("Object of type '%s' is not JSON serializable" % type(obj).__name__)


"""
getSalt генерирует соль для пароля.

:return: случайно сгенерированно 29 битовых символа
"""
def getSalt():
  return bcrypt.gensalt()
  # will be 29 chars

"""
hashPassword хэширует пароль с помощью соли и md5.

:param password: зашифрованный пароль с помощью md5
:param salt: соль
:return: зашифрованный пароль
"""
def hashPassword(password, salt):
  m = md5(salt)
  m.update(password.encode('utf8'))
  pwd = m.hexdigest()
  return pwd

"""
checkPassword шифрует пароль для проверки с помощью соли и md5.

:param password: зашифрованный пароль с помощью md5
:param salt: соль, недекодированная
:return: зашифрованный пароль
"""
def checkPassword(password, salt):
  salt = salt.encode('utf8')
  pwd = hashPassword (password, salt)
  return pwd

def encode_token(user_id):
    try:
        payload = {
            'exp': datetime.utcnow() + timedelta(days=0, seconds=3600 ),
            'iat': datetime.utcnow(),
            'sub': user_id
        }
        return jwt.encode(
            payload,
            app.config.get('SECRET_KEY'),
            algorithm='HS256'
        )
    except Exception as e:
        return e


@staticmethod
def decode_auth_token(auth_token):
    try:
        payload = jwt.decode(auth_token, app.config.get('SECRET_KEY'))
        return payload['sub']
    except jwt.ExpiredSignatureError:
        return 'Signature expired. Please log in again.'
    except jwt.InvalidTokenError:
        return 'Invalid token. Please log in again.'


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if "Authorization" in request.headers:
            token = request.headers["Authorization"].split(" ")[1]
            print(token)
        if not token:
            return {
                "message": "Authentication Token is missing",
                "error": "Unauthorized"
            }, 401
        try:
            data=jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
            current_user=User().get_by_id(data["user_id"])
            if current_user is None:
                return {
                "message": "Invalid Authentication token",
                "error": "Unauthorized"
            }, 401
        except Exception as e:
            return {
                "message": "An error Occured",
                "error": str(e)
            }, 500

        return f(current_user, *args, **kwargs)

    return decorated

@app.route('/exiles/api/')
def home():
    return "Hello"

@app.route('/exiles/api/documents/', methods=['GET'])
def documents():
    if not request.cookies.get('access_token'):
        abort(401)

    if request.method == 'GET':
      json_data=[]
      document_schema = DocumentSchema()
      documents = Document.query.all()
      #row_headers = ["id", "fund", "inventory", "storage_unit", "total_lists_num", "year", "additional_info", "url", "creator_id", "creating_date", "is_removed", "visible_mode"]
      for doc in documents:
        json_data.append(document_schema.dump(doc))

    return json.dumps(json_data)

@app.route('/exiles/api/archive/', methods=['GET'])
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
    return json.dumps(json_data, default=morphDec)

@app.route('/exiles/api/users/', methods=['GET'])
def users():
    if not request.cookies.get('access_token'):
        abort(401)

    if request.method == 'GET':
        json_data=[]

        varlist = ['usr_id','usr_role','usr_username','usr_email','usr_registration_date']
        users = User.query.all()
        user_schema = UserSchema(only=varlist)
        users
        for user in users:
            temp = {}
            records = Record.query.filter(Record.rec_creator_id == user.get_user_id()).count()
            user_temp = user_schema.dump(user)
            temp['user'] = user_temp
            temp['records_count'] = records
            json_data.append(temp)
    return json.dumps(json_data, default=morphDec)

@app.route('/exiles/api/documents/view/<id>', methods=['GET','POST'])
def one_document(id):
    if not request.cookies.get('access_token'):
        abort(401)

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

@app.route('/exiles/api/archive/view/<id>', methods=['GET','POST'])
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

    return json.dumps(json_data, default=morphDec)

@app.route('/exiles/api/documents/add/', methods=['POST'])
def document_add():
    if not request.cookies.get('access_token'):
        abort(401)

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

@app.route('/exiles/api/signup/', methods=['POST'])
def user_add():
    if not request.cookies.get('access_token'):
        abort(401)

    if request.method == 'POST':
      username = request.json["username"]
      role = request.json["role"]
      email = request.json["email"]
      salt = getSalt()
      password = request.json["password"]
      password_confirm = request.json["password_confirm"]
      cur_date = request.json["date"]

      if username == None:
        return {'msg': 'Missing username'}, 422

      if role == None:
          return {'msg': 'Missing role'}, 422

      if email == None:
          return {'msg': 'Missing email'}, 422

      if salt == None:
          return {'msg': 'Missing salt'}, 422

      if password == None:
        return {'msg': 'Missing password'}, 422

      if password_confirm == None:
        return {'msg': 'Missing password confirm'}, 422

      if password != password_confirm:
          return {'msg': 'Passwords doesn\'t match'}, 401

      hashed_password = hashPassword(request.json["password"], salt)
      user = User(usr_username=username, usr_role=role, usr_email=email, usr_salt=salt, usr_hashed_password=hashed_password, usr_registration_date=cur_date)

      username_exists = User.query.filter_by(usr_username = username).first() is not None
      email_exists = User.query.filter_by(usr_email = email).first() is not None

      access_token = create_access_token(identity=username)

      if not username_exists or email_exists:
        try:
          db.session.add(user)
          db.session.commit()
          resp = {
            "status":"Success",
            "message":"User successfully registered",
            "access_token": access_token
          }
          return make_response(jsonify(resp)), 200

        except Exception as e:
          db.session.rollback()
          resp = {
              "status" :"Error",
              "message" :" Error occured, user registration failed"
          }
          return make_response(jsonify(resp)),401
      else:
          resp = {
              "status":"Error",
              "message":"User already exists"
          }
          return make_response(jsonify(resp)),409

@app.route('/exiles/api/login/', methods=['POST'])
def user_login():
    if request.method == 'POST':
      username = request.json["username"]
      password = request.json["password"]

      user = User.query.filter(User.usr_username == username).first()

      if user is None:
          return jsonify({"Error" : "User or password incorrect"}), 401

      if not (user.usr_hashed_password == checkPassword(password, user.usr_salt)):
          return jsonify({"Error" : "User or password incorrect"}), 401

      access_token = create_access_token(identity=username)
      response = {"access_token":access_token}
      return response


@app.route('/exiles/protected', methods=['GET'])
@token_required
def protected():

   resp = {"message":"This is a protected view"}
   return make_response(jsonify(resp)), 404


@app.route('/exiles/api/profile/', methods=['GET'])
def user_profile():
    if not request.cookies.get('access_token'):
        abort(401)
    temp = {}
    token = json.dump(session.get("token"))
    temp['token'] = token
    return json.dumps(temp), 200

@app.route('/exiles/api/logout/', methods=['GET'])
def user_logout():
    if not request.cookies.get('access_token'):
        abort(401)

    response = jsonify({"msg": "Logout ok"})
    unset_jwt_cookies(response)
    return response


if __name__ == '__main__':
    app.run(host="127.0.0.1", port="5000", debug=True)