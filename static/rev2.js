
    var generic={
        togg:function(pos){
        var toggle = document.getElementById(pos+'_chunk')
        console.log("toggle"+ toggle)
        if (toggle.className == 'togg_on')
        {toggle.className = 'togg_off'}
        else
        {toggle.className = 'togg_on'}
        
    },
    debug:function(){
        //console.log("names: ",table.saved_names)
        //console.log("cols: ",table.saved_cols)
        console.log("build: ",table.built_obj)
    }
    }

    var table = {
        unsafe_counter:0,
        built_obj : [],
        
        /*saved_names : [],
        saved_cols : [],

        pop_cols: function(arg){
            table.saved_cols.push(arg)
        },
        pop_names: function(arg){
            table.saved_names.push(arg)
        },*/

        map: function(names,cols){
            //table.pop_names(names)
            //table.pop_cols(cols)

            for (var asd in names){
                table.built_obj.push(names[asd])
                table.built_obj[asd].push(cols[asd])
            }
            console.log("debug in map")
            generic.debug()
        },

        add:function(){
            //console.log("try add template")
            
            //pull template, set ID, +1 counter
            let templateInstance = document.getElementById("table_template");
            let clone = document.importNode(templateInstance .content, true);

            //its a reverse lookup you idiot
            clone.querySelector('div.row').id = "table_"+table.unsafe_counter;
            //add table data
            //ugly repurpose of unsafe coutner as index access
            // clone.querySelector('div.col').innerHTML = "Table : " + table.built_obj[table.unsafe_counter][0] + " Data: "+ table.built_obj[table.unsafe_counter][1];
            //future me switch from inner, it purges childs
            //or go down the rabbit hole again
            clone.querySelector('div.col').innerHTML = "Table : " + table.built_obj[table.unsafe_counter][0];
            var selbox_div = document.createElement("div")
            selbox_div.setAttribute("class", "col")
            var selectbox = document.createElement("select")
            selectbox.setAttribute("id", "data"+table.unsafe_counter)

            //past you has decided to go down the rabbit hole your not welcome
            for (var item = 0; item < table.built_obj[table.unsafe_counter][1].length;item ++){
                console.log(table.built_obj[table.unsafe_counter][1][item][1])
                var option = document.createElement("option");
                option.value = table.built_obj[table.unsafe_counter][1][item][1]
                option.text = table.built_obj[table.unsafe_counter][1][item][1]
                selectbox.appendChild(option);
            }
            
            table.unsafe_counter +=1
            selbox_div.appendChild(selectbox); 
            clone.querySelector('div.row').appendChild(selbox_div); 
            document.getElementById("tab_content").appendChild(clone); 
        },


        startup:function(names,cols){
            table.map(names,cols)
            for (item in names){
                table.add()
            }
        }
    }