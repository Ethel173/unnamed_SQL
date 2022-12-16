import json
import regex as re
import sqlite3
from sqlite3 import Error
from pydoc import render_doc
from telnetlib import SB
from xml.dom.minidom import Document
from flask import Flask,render_template,request,flash
from jinja2 import Template


app = Flask(__name__)

#i forgot what this is for but past you needed this for ???? reasons
app.secret_key = b'_5asdsaw%2xec]/'


def create_connection(path):
    connection = None
    try:
        connection = sqlite3.connect(path)
        print("Connection to SQLite DB successful")
    except Error as e:
        print(f"The error '{e}' occurred")

    return connection


#edit me to point to the DB to be used
db = create_connection("dbs/finance.db")

pointer = db.cursor()

#sqlite_master is hidden internal table
names = pointer.execute("SELECT tbl_name FROM sqlite_master WHERE type='table' AND name != 'sqlite_sequence';").fetchall()
sql = pointer.execute("SELECT sql FROM sqlite_master WHERE type='table' AND name != 'sqlite_sequence';").fetchall()


tab_builder=[]
for table in range(len(names)):
    test = pointer.execute("PRAGMA table_info("+names[table][0]+")").fetchall()
    tab_builder.append(test)



@app.route("/",methods = ['POST', 'GET'])
def hello_world():
    if request.method == 'GET':
        table_counter = 0
    return render_template("rev2.html",schema=json.dumps(names),bulk = json.dumps(tab_builder),meth = request.method,debug=True)
        #return render_template("test.html",name = "test")

