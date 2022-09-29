import sqlite3
from sqlite3 import Error
from pydoc import render_doc
from telnetlib import SB
from xml.dom.minidom import Document
from flask import Flask,render_template,request,flash
from jinja2 import Template


app = Flask(__name__)
app.secret_key = b'_5asdsaw%2xec]/'


def create_connection(path):
    connection = None
    try:
        connection = sqlite3.connect(path)
        print("Connection to SQLite DB successful")
    except Error as e:
        print(f"The error '{e}' occurred")

    return connection

db = create_connection("dbs/finance.db")

pointer = db.cursor()

#sqlite_master is global hidden table
#future you is going to hate dealing with this
schema = pointer.execute("SELECT * FROM sqlite_master WHERE type='table';").fetchall()

@app.route("/",methods = ['POST', 'GET'])
def hello_world():
    if request.method == 'GET':
        table_counter = 0
    return render_template("starter.html",schema=schema,meth = request.method,debug=True)
        #return render_template("test.html",name = "test")

