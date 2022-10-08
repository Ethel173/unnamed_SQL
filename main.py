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

#sqlite_master is hidden internal table
#future you is going to hate dealing with this
#schema = pointer.execute("SELECT * FROM sqlite_master WHERE type='table' AND name != 'sqlite_sequence';").fetchall()
names = pointer.execute("SELECT tbl_name FROM sqlite_master WHERE type='table' AND name != 'sqlite_sequence';").fetchall()
sql = pointer.execute("SELECT sql FROM sqlite_master WHERE type='table' AND name != 'sqlite_sequence';").fetchall()
#schema = pointer.execute("SELECT * FROM sqlite_master WHERE type='table' AND name != 'sqlite_sequence';").fetchone()

#print(str(schema[0]))

#test= pointer.execute("select * from pragma table_info("+str(schema[0][2])+");")
#test= schema.execute("pragma table_list;").fetchall()

#print(names)

#print (sql)
#test = re.findall("((?<=\()|(?<=\\n *)|(?<=, *))\w*(?= )",str(sql))
#test = re.findall("((?:\()|(?:\\n *)|(?:, *))\w*(?= )",str(sql))


tab_builder=[]
for table in range(len(names)):
    
    #future me look into what the fuck PRAGMA actually is
    #print("TABLE: ",names[table][0])
    test = pointer.execute("PRAGMA table_info("+names[table][0]+")").fetchall()
    tab_builder.append(test)
    #this doesnt work but keep this here incase for the regex
    #test = re.findall("((?<=\()\w+)|((?<=, *)\w+)|((?<=\\n *)\w+)",str(sql[table]))
    
    #print(test)

#print("TABLE BUILDER: ",tab_builder)
@app.route("/",methods = ['POST', 'GET'])
def hello_world():
    if request.method == 'GET':
        table_counter = 0
    return render_template("rev2.html",schema=json.dumps(names),bulk = json.dumps(tab_builder),meth = request.method,debug=True)
        #return render_template("test.html",name = "test")

