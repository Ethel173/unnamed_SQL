
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
        //console.log("link: ",link.unsafe_counter)
    },
    startup:function(names,cols){
        table.map(names,cols)
        for (item in names){
            table.add()
        }
        link.add()

    }
    }

    var table = {
        unsafe_counter:0,
        built_obj : [],
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
                //console.log(table.built_obj[table.unsafe_counter][1][item][1])
                var option = document.createElement("option");
                option.value = table.built_obj[table.unsafe_counter][1][item][1]
                option.text = table.built_obj[table.unsafe_counter][1][item][1]
                selectbox.appendChild(option);
            }
            
            table.unsafe_counter +=1
            selbox_div.appendChild(selectbox); 
            clone.querySelector('div.row').appendChild(selbox_div); 
            document.getElementById("tab_content").appendChild(clone); 
        }
    }

    var link = {
        unsafe_counter:0,

    add: function(){
        let templateInstance = document.getElementById("link_template");
        let clone = document.importNode(templateInstance .content, true);
        clone.querySelector('div.row').setAttribute("id", "link_"+link.unsafe_counter)
        //past you is being efficient
        //display text
        clone.querySelector('div.col').innerHTML = "link "+link.unsafe_counter
        
        //setup on change event
        clone.querySelector('select[id=sel_1_name]').setAttribute("onchange", "link.pop_sub_table("+"'"+link.unsafe_counter+"','1')")
        clone.querySelector('select[id=sel_2_name]').setAttribute("onchange", "link.pop_sub_table("+"'"+link.unsafe_counter+"','2')")

        //why the fuck does this not work???
        //lazy duped fix since it works
    for (var item = 0; item < table.built_obj.length;item ++){
        //console.log(table.built_obj[item][0])
        var option = document.createElement("option");
        option.value = item
        option.text = table.built_obj[item][0]
        //option.setAttribute("onclick","console.log('it works')")
        //clone.querySelector('select[id=sel_2_name]').appendChild(option);
        clone.querySelector('select[id=sel_1_name]').appendChild(option);
    }
    for (var item = 0; item < table.built_obj.length;item ++){
        //console.log(table.built_obj[item][0])
        var option = document.createElement("option");
        option.value = item
        option.text = table.built_obj[item][0]
        clone.querySelector('select[id=sel_2_name]').appendChild(option);
        //clone.querySelector('select[id=sel_1_name]').appendChild(option);
    }

        link.unsafe_counter++
        document.getElementById("link_content").appendChild(clone); 
    },

    pop_sub_table:function(invoker,subtab)
    {
        //console.log("works")
        //console.log(invoker)
        //console.log(subtab)

        var main_table = document.getElementById("link_"+invoker)
        // console.log("MAIN TABLE ")
        //console.log(main_table)

        //console.log("select[id=sel_"+subtab+"_name]")
        var subname = main_table.querySelector("select[id=sel_"+subtab+"_name]")
        //console.log("subname ")
        //console.log(subname.value)

        var subtable = main_table.querySelector("select[id=sel_"+subtab+"_data]")
        //console.log("SUB TABLE ")
        //console.log(subtable)
        //depopulate all but "SELECT ME" option
        while (subtable.options.length > 1) {
            subtable.remove(1);
        }
        //check that there is a table to pull from or user chose 'None'
        if (subname.value== '' || subname.value=="None"){
            subtable.setAttribute("disabled","True")
            subtable.options[0].selected = true
            return
        }
        subtable.removeAttribute("disabled")

        for (var item = 0; item < table.built_obj[subname.value][1].length;item ++){
            var option = document.createElement("option");
            option.value = [subname.value,item]
            option.text = table.built_obj[subname.value][1][item][1]
            subtable.appendChild(option);
        }

    },
    remove: function(){
        var main_link = document.getElementById("link_"+(link.unsafe_counter-1))
        //console.log(main_link)
        var sub_data = main_link.querySelector("select[id=sel_1_name]")
        //console.log(sub_data)
        if (sub_data.value!="None"){
            alert("link "+(link.unsafe_counter-1)+" table 1 has data")
            return
        }
        var sub_data = main_link.querySelector("select[id=sel_2_name]")
        if (sub_data.value!="None"){
            alert("link "+(link.unsafe_counter-1)+" table 2 has data")
            return
        }

        main_link.remove()
        link.unsafe_counter -= 1
    }
}