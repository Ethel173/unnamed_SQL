import sqlite3
from pydoc import render_doc
from xml.dom.minidom import Document
from flask import Flask,render_template,request,flash
from jinja2 import Template


app = Flask(__name__)
app.secret_key = b'_5asdsaw%2xec]/'

db = 'dbs/finance.db'




@app.route("/",methods = ['POST', 'GET'])
def hello_world():
    if request.method == 'GET':
        table_counter = 0
        #test = new_table(table_counter)
        #template_test = Template(new_table(table_counter))
        #return Template.render(template_test)
    '''else:
        
        main_driver = request.form.get("main_driver")
        warden = global_table_holder()
        print ("MAIN ", main_driver)
        try:
            table_counter =  int(request.form.get("adj_tables_counter"))
        except ValueError:
            flash("bad int")
            pass
        
        #test = new_table(table_counter)
        #template_test = Template(new_table(table_counter))
        #return Template.render(template_test)
    final = "SELECT "
    print ("METHOD ", request.method)
    print ("COUTNER ", request.form.get("adj_tables_counter"))
    print ("PREV ", request.form.get("prev_tables"))'''
    
    
    #template_act = Template(new_table(str(table_counter+1)))
    #return render_template("test.html",tables = template_act,meth = request.method, counter = str(table_counter+1))
    #flash("test")
    #flash("test2")
    return render_template("starter.html",tables = new_table(table_counter),meth = request.method, tab_counter = table_counter,debug=True)
        #return render_template("test.html",name = "test")



def new_table(intake=0):
        counter = 0
        packer = {}
        while counter < intake:
            counter += 1
            internal_name = "table" + str(counter)
            internal_id = "table_id" + str(counter)
            name = "table " + str(counter)
            div_spacer = "div_" + str(counter)
            internal_id_col = "id" + str(counter) + "_col"
            table_data = "table_" + str(counter) + "_field"
            col_data = "id" + str(counter) + "_col_data"
            packer.update({counter:{"internal":internal_name,"internal_id":internal_name,"div_spacer":div_spacer,"internal_id":internal_id,"name":name,"internal_id_col":internal_id_col,"table_data":table_data,"col_data":col_data}})
        return packer