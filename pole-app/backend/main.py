from flask import Flask, request, abort, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
mysql = MySQL()

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'PolE_archive'

mysql.init_app(app)

@app.route('/')
def home():
    return "Hello"

@app.route('/documents', methods = ['GET'])
def documents():
    if request.method == 'GET':
        cursor = mysql.connection.cursor()
        cursor.execute(''' SELECT * FROM tbldocument ''')
        data = cursor.fetchall()
        cursor.close()
        return jsonify(data)


@app.route('/exiles', methods = ['GET'])
def exiles():
    cursor = mysql.connection.cursor()
    cursor.execute(''' SELECT * FROM tblexile ''')
    data = cursor.fetchall()
    cursor.close()
    return jsonify(data)

if __name__ == '__main__':
    app.run(host="127.0.0.1", port="5000", debug=True)