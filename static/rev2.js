
    var generic={
        togg:function(pos){
        var toggle = document.getElementById(pos+'_chunk')
        //console.log("toggle"+ toggle)
        if (toggle.className == 'togg_on')
        {toggle.className = 'togg_off'}
        else
        {toggle.className = 'togg_on'}
        
    },
    debug:function(){
        //console.log("names: ",table.saved_names)
        //console.log("cols: ",table.saved_cols)
        console.table(table.built_obj)
        //console.log("link: ",link.unsafe_counter)
        console.table(link.built)
    },
    startup:function(names,cols){
        table.map(names,cols)
        //cosmetics
        for (item in names){
            table.add()
        }
        //link.add()
        act2.add()

        //dont need this at startup
        //generic.update_statement()

        //cheeky little lazy hack
        generic.incomplete_statment("ACT table Not Completed")
    },

    //A
    //TODO 
    //REALLY SHOULD ADD THAT CAP TO THIS
    background_tracker :  65,

    /**building this in try_add
    * * table
    * * * alias 
    * * * colums
    */
    background_tables : {"ZZZ_hidden_length" : 0},
    /**links\
     * holds [TAB1,TAB2] pairs
    */
    join_links : {},


    update_statement:function()
    {
    //clear new batch    
    generic.reset_tables()
    //act section
    try{
        for (var i = 0; i < act2.unsafe_counter; i++)
        {
            table_sel = act2.built[i]["column"]
            generic.try_add_to_background(table_sel)
            //generic.main_table = table_sel
            //console.log("background tables:")
            //console.table(generic.background_tables)
        }
    }
        catch{
            generic.incomplete_statment("ACT table Not Completed")
            return
        }
    //links section
    //need to replace this with subroutine
    try{
        for (var i = 0; i < link.unsafe_counter; i++)
        {
            sel1 = link.built[i].sel1data[0]
            sel2 = link.built[i].sel2data[0]
            //i dont like this
            if (sel1 == undefined || sel2 == undefined||sel1 == "None" || sel2 == "None"||sel1 == "" || sel2 == ""){
                return
            }
            generic.join_links.push(link.built[i].sel1data[1])
            generic.join_links.push(link.built[i].sel2data[1])
        }
    }
        catch{
            generic.incomplete_statment("Table Link Not Completed")
            return
        }
        //debug stuff
        console.info("background tables:")
        console.table(generic.background_tables)

        var rotating_statement = "SELECT "
        

        //chunk for columns
        lazy_col_flag = 0
        for (var INDEX = 0; INDEX <= generic.background_tables.ZZZ_hidden_length; INDEX ++)
        {
            var table_key = Object.keys(generic.background_tables)[INDEX]
            if (table_key == "ZZZ_hidden_length" || table_key == "" || table_key == undefined)
            {
                continue
            }

        //appaend cols
        for ( var COL_INDEX = 0; COL_INDEX < generic.background_tables[table_key].columns.length; COL_INDEX ++)
        {
            if(lazy_col_flag ==1){
                rotating_statement = rotating_statement + " , "
            }
            rotating_statement = rotating_statement + generic.background_tables[table_key].alias_name + "."+ generic.background_tables[table_key].columns[COL_INDEX] 
            lazy_col_flag = 1 
        }
    }
        //FROM STATEMENT
        rotating_statement = rotating_statement +" FROM "
        //chunk for tables
        lazy_table_flag = 0
        for (var INDEX = 0; INDEX <= generic.background_tables.ZZZ_hidden_length; INDEX ++)
        {
            var table_key = Object.keys(generic.background_tables)[INDEX]
            if (table_key == "ZZZ_hidden_length" || table_key == "" || table_key == undefined)
            {
                continue
            }
        //appaends the table and nickname
        if(lazy_table_flag == 1){
            rotating_statement = rotating_statement + " , "
        }
            rotating_statement = rotating_statement + table_key
            rotating_statement = rotating_statement +" AS " 
            rotating_statement = rotating_statement + generic.background_tables[table_key].alias_name
            lazy_table_flag = 1
        }
        generic.valid_statment(rotating_statement)
    },
    failcheck:function(test){
        if (test == null || test == "None" || test == ""){
            return true
        }
    },
    /**writes the error to webpage preview */
    incomplete_statment:function(errcode){
        let out_div = document.getElementById("output")
        out_div.innerHTML = errcode
    },
    /**writes the to webpage preview */
    valid_statment:function(statement){
        let out_div = document.getElementById("output")
        out_div.innerHTML = statement
    },
    reset_tables:function(){
        generic.background_tracker = 65
        generic.background_tables = {"ZZZ_hidden_length" : 0}
        generic.join_links = {}
    },
    //controlls subroutines
    try_add_to_background:function(tab_name){
        //pass the table name
        generic.try_add_table(tab_name[0])
        //pass the tab obj
        generic.try_add_col(tab_name)
        console.log(generic.background_tables)
    },
    //sub to add table and format new stuff 
    try_add_table:function(tab_name){
        if (tab_name in generic.background_tables){
            console.warn(tab_name + " already loaded into tables")
            return
        }
        generic.background_tables[tab_name] = {}
        generic.background_tables[tab_name].alias_name = String.fromCharCode(generic.background_tracker)
        generic.background_tables[tab_name].columns = []
        generic.background_tables.ZZZ_hidden_length += 1
        generic.background_tracker += 1
        //if overflow from ('Z') bump to 97 ("a")
        if (generic.background_tracker ==91){
            generic.background_tracker = 97
        }
        //if overflow from ('z') throw error
        if (generic.background_tracker == 123){
            alert("there is no reason you need 52 different tables in one querry")
            alert("fix your code, im not supporting that")
            generic.background_tracker = 65
        }
    },
    //sub to add the sel colums
    try_add_col:function(tab_name){
        if (tab_name[1] == undefined){
            return
        }
        if (tab_name[1] in generic.background_tables[tab_name[0]].columns){
            console.warn(tab_name[1] + " already loaded into subtables")
            return
        }
        generic.background_tables[tab_name[0]]["columns"].push(tab_name[1])
        
    },
    //SR to handle join links
    link_joiner:function(link_input){
        //WHAT THE FUCK GOES HERE AGAIN
    }
    }

    var table = {
        format_arr:["Cid: ","Name: ","Type: ","NOT null: ","Default Value: ","Primarykey: "],
        unsafe_counter:0,
        built_obj : [],
        map: function(names,cols){
            for (var i in names){
                table.built_obj.push(names[i])
                table.built_obj[i].push(cols[i])
            }
        },

        add:function(){
            //pull template, set ID, +1 counter
            let templateInstance = document.getElementById("table_template");
            let clone = document.importNode(templateInstance .content, true);

            //its a reverse lookup you idiot
            clone.querySelector('div.row').id = "table_"+table.unsafe_counter;
            //add table data
            //ugly repurpose of unsafe coutner as index access
            clone.querySelector('div.col').innerHTML = table.built_obj[table.unsafe_counter][0];
            clone.querySelector('select[id=sel_1_name]')

            //setup change event
            clone.querySelector("select[id=col_name]").setAttribute("onchange", "table.pop_info("+""+table.unsafe_counter+")")

            //pop table names
            for (var item = 0; item < table.built_obj[table.unsafe_counter][1].length;item ++){
                var option = document.createElement("option");
                option.value = item
                option.text = table.built_obj[table.unsafe_counter][1][item][1]
                clone.querySelector("select[id=col_name]").appendChild(option);
            }
            document.getElementById("tab_content").appendChild(clone); 
            //pop table info
            table.pop_info(table.unsafe_counter)
            table.unsafe_counter +=1
        },

        pop_info:function(invoker)
        {
            let target = document.getElementById("table_"+invoker)
            let info = target.querySelector("select[id=col_name]").value
        //depopulate all
        while (target.querySelector("select[id=col_info]").options.length > 0) {
            target.querySelector("select[id=col_info]").remove(0);
        }


            for (var item = 0; item < table.built_obj[invoker][1][info].length-2;item ++){
                var option = document.createElement("option");
                option.value = table.built_obj[invoker][1][info][item+2]
                if (table.built_obj[invoker][1][info][item+2] == 1){
                    option.text = table.format_arr[item+2] + "Yes"
                } 
                else if (table.built_obj[invoker][1][info][item+2] == 0){
                    option.text = table.format_arr[item+2] + "No"
                }
                else{
                    option.text = table.format_arr[item+2] + table.built_obj[invoker][1][info][item+2]
                }
                target.querySelector("select[id=col_info]").appendChild(option);
            }
        }
    }


    var link = {
        /** tracks what link number we are on  */
        unsafe_counter:0,
        has_links:false,
        /**
         * the link table object in memory used to keep track of things 
         */
        built:[],
        /**adds a new link block to memory and increments unsafe counter */
    add: function(){
        //handles safety logic
        if (link.unsafe_counter != 0){
            for (let index = 1; index <= link.unsafe_counter; index++) {
                var check_table = document.getElementById("link_"+(index-1))
                var subname1 = check_table.querySelector("select[id=sel_1_data]")
                var subname2 = check_table.querySelector("select[id=sel_2_data]")

                //checks for unfilled fields
                /*
                if (subname1.value== '' || subname1.value=="None"){
                    alert("select link "+(index-1)+" table 1 data first")
                    return
                }
                if (subname2.value== '' || subname2.value=="None"){
                    alert("select link "+(index-1)+" table 2 data first")
                    return
                }
                */
            }
        }


        let templateInstance = document.getElementById("link_template");
        let clone = document.importNode(templateInstance .content, true);
        clone.querySelector('div.row').setAttribute("id", "link_"+link.unsafe_counter)
        //past you is being efficient
        //display text
        clone.querySelector('div.col').innerHTML = "link "+link.unsafe_counter
        
        //setup on change event
        clone.querySelector('select[id=sel_1_name]').setAttribute("onchange", "link.pop_sub_table("+"'"+link.unsafe_counter+"','1'),link.mem_update("+link.unsafe_counter+")")
        clone.querySelector('select[id=sel_2_name]').setAttribute("onchange", "link.pop_sub_table("+"'"+link.unsafe_counter+"','2'),link.mem_update("+link.unsafe_counter+")")
        clone.querySelector('select[id=sel_1_data]').setAttribute("onchange", "link.mem_update("+link.unsafe_counter+")")
        clone.querySelector('select[id=sel_2_data]').setAttribute("onchange", "link.mem_update("+link.unsafe_counter+")")
        clone.querySelector('select[id=type]').setAttribute("onchange", "link.mem_update("+link.unsafe_counter+")")

        //(slightly less)lazy fix
        //i have no idea why this needs to be duped but it does
    for (var item = 0; item < table.built_obj.length;item ++){
        var option = document.createElement("option");
        option.value = item
        option.text = table.built_obj[item][0]
        clone.querySelector('select[id=sel_1_name]').appendChild(option)
        var option = document.createElement("option");
        option.value = item
        option.text = table.built_obj[item][0]
        clone.querySelector('select[id=sel_2_name]').appendChild(option)
    }
    document.getElementById("link_content").appendChild(clone); 
    link.built.push(link.unsafe_counter)
    //console.table(link.built)
    link.built[link.unsafe_counter] = []
        link.unsafe_counter++
        //no check needed for this
        link.has_links=true
    },
/** regens subtable info on selecting a different table */
    pop_sub_table:function(invoker,subtab)
    {
        //generic.update_statement()
        var main_table = document.getElementById("link_"+invoker)
        var subname = main_table.querySelector("select[id=sel_"+subtab+"_name]")
        var subtable = main_table.querySelector("select[id=sel_"+subtab+"_data]")
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
        
        //populate subtables
        //TODO rewrite since your tabbing over to using names instead of
        for (var item = 0; item < table.built_obj[subname.value][1].length;item ++){
            var option = document.createElement("option");
            option.value = [table.built_obj[subname.value][0],table.built_obj[subname.value][1][item][1]]
            option.text = table.built_obj[subname.value][1][item][1]
            subtable.appendChild(option);
        }
    },
    pop_sub_table_info:function(invoker,subtab)
    {
        //generic.update_statement()
        var main_table = document.getElementById("link_"+invoker)
        var subname = main_table.querySelector("select[id=sel_"+subtab+"_name]")
        var subtable = main_table.querySelector("select[id=sel_"+subtab+"_data]")
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
        
        //populate subtables
        for (var item = 0; item < table.built_obj[subname.value][1].length;item ++){
            var option = document.createElement("option");
            option.value = [subname.value,item]
            option.text = table.built_obj[subname.value][1][item][1]
            subtable.appendChild(option);
        }
    },



    remove: function(){
        var main_link = document.getElementById("link_"+(link.unsafe_counter-1))
        if (main_link.querySelector("select[id=sel_1_name]").value!="None"){
            alert("link "+(link.unsafe_counter-1)+" table 1 has data")
            return
        }
        if (main_link.querySelector("select[id=sel_2_name]").value!="None"){
            alert("link "+(link.unsafe_counter-1)+" table 2 has data")
            return
        }
        //remove the entry in html
        main_link.remove()
        //delete the last entry in built obj
        link.built.pop()
        //log
        console.table(link.built)
        link.unsafe_counter -- 
        if (link.unsafe_counter == 0){
            link.has_links=false
        }
        console.log("Link counter decremented to :" + link.unsafe_counter)
        generic.update_statement()
    },


    mem_update:function(invoker){
    var table = document.getElementById("link_"+invoker)
    //console.log("invoker:" + invoker)
    //link.built[invoker].sel1 = table.querySelector('select[id=sel_1_name]').value
    link.built[invoker].sel1data = table.querySelector('select[id=sel_1_data]').value.split(",")
    //link.built[invoker].sel2 = table.querySelector('select[id=sel_2_name]').value
    link.built[invoker].sel2data = table.querySelector('select[id=sel_2_data]').value.split(",")
    link.built[invoker].type = table.querySelector('select[id=type]').value
    //console.table(link.built)
    generic.update_statement()
}
    }

    var act2={
        unsafe_counter:0,
        /**obj in mem with the selected actions, your dumb and setup the info for this in act obj update
         * * backend
         * * column
         * * cond
         * * has_cond
         * * payload
         * * type
         */
        built:[],
        /**adds new act to webpage */
        add:function(){
            let templateInstance = document.getElementById("act_template");
            let clone = document.importNode(templateInstance .content, true);
            clone.querySelector('div.row').setAttribute("id", "act_"+act2.unsafe_counter)
            clone.querySelector('div.col').innerHTML = "act "+act2.unsafe_counter

            //act 0 edge case
            if (act2.unsafe_counter == 0){
                clone.querySelector('select[id=type]').setAttribute("Disabled", "true")
                while (clone.querySelector('select[id=type]').options.length > 0) {
                    clone.querySelector('select[id=type]').options.remove(0);
                }
                var option = document.createElement("option");
                option.value = "0_index"
                option.text = "NONE"
                clone.querySelector('select[id=type]').appendChild(option);
            }
            else{
                clone.querySelector('select[id=payload]').setAttribute("Disabled", "true")
                    clone.querySelector('select[id=payload]').innerHTML = ""
                var option = document.createElement("option");
                option.value = "PASS"
                option.text = "NONE"
                clone.querySelector('select[id=payload]').appendChild(option);
            }




            //setup on change events
            clone.querySelector('select[id=payload]').setAttribute("onchange", "act2.obj_update("+act2.unsafe_counter+")")
            clone.querySelector('select[id=sel_name]').setAttribute("onchange", "act2.pop_actdata("+""+act2.unsafe_counter+"),act2.obj_update("+act2.unsafe_counter+")")
            clone.querySelector('select[id=sel_data]').setAttribute("onchange", "act2.obj_update("+act2.unsafe_counter+")")
            //move
            clone.querySelector('input[id=cond_flip]').setAttribute("onchange", "act2.unlock_cond('"+act2.unsafe_counter+"'),act2.obj_update("+act2.unsafe_counter+")")
            clone.querySelector('[id=cond]').setAttribute("onblur", "act2.obj_update("+act2.unsafe_counter+")")
    
            for (var item = 0; item < table.built_obj.length;item ++){
                var option = document.createElement("option");
                option.value = table.built_obj[item][0]
                option.text = table.built_obj[item][0]
                clone.querySelector('select[id=sel_name]').appendChild(option);
            }
    
            document.getElementById("act_content").appendChild(clone); 
            //console.table(act2.built)
            act2.built[act2.unsafe_counter] = []
            //console.table(act2.built)
            act2.unsafe_counter++
        },
        pop_actdata:function(invoker){
            //generic.update_statement()
            var main_table = document.getElementById("act_"+invoker)
            var subname = main_table.querySelector("select[id=sel_name]")
            var subtable = main_table.querySelector("select[id=sel_data]")
        
            //depopulate all but SELECT ME
            while (subtable.options.length > 1) {
                subtable.remove(1);
            }

            //check that there is a table to pull from or user chose 'None'
            if (subname.value== '' || subname.value=="None"){
                subtable.setAttribute("disabled","True")
                subtable.options[0].selected = true
                act2.unlock_cond(invoker)
                return
            }
            //ALL handler
            var option = document.createElement("option");
            option.value = [[subname.value],["ALL"]]
            option.text = "ALL (*)"
            subtable.appendChild(option);

            subtable.removeAttribute("disabled")
    //hacky fix
    hacky_fix = 0
    for (var item = 0; item < table.built_obj[1].length;item ++){
        if (table.built_obj[item][1] == subname.value){
            hacky_fix = item
        }

    } 

            for (var item = 0; item < table.built_obj[hacky_fix][1].length;item ++){
                var option = document.createElement("option");
                option.value = [subname.value,table.built_obj[hacky_fix][1][item][1]]
                option.text = table.built_obj[hacky_fix][1][item][1]
                subtable.appendChild(option);
            }
        },

        unlock_cond:function(invoker){
            var main_table = document.getElementById("act_"+invoker)
            var check = main_table.querySelector("input[id=cond_flip]")
            //console.log(check)
            var prefix_sub = main_table.querySelector("[id=cond_type]")
            var subtable = main_table.querySelector("[id=cond]")
            var fitler_type = main_table.querySelector("[id=type]")
            if (check.checked == false){
                //subtable.setAttribute("placeholder", subtable.value)
                prefix_sub.setAttribute("disabled","True")
                subtable.setAttribute("disabled","True")
                fitler_type.setAttribute("disabled","True")
                subtable.setAttribute("placeholder","NO FILTER")
                return
            }
            subtable.setAttribute("placeholder","TYPE HERE")
            subtable.removeAttribute("disabled")
            prefix_sub.removeAttribute("disabled")
            if (invoker > 0)
            {    
                fitler_type.removeAttribute("disabled")
            }
        },
        obj_update:function(invoker){
            //console.table(act2.built)
            //console.log("PREPROCESS")
            var table = document.getElementById("act_"+invoker)
            //console.log("invoker:" + invoker)
            //console.log(table)
            act2.built[invoker].backend = table.querySelector('[id=type]').value
            act2.built[invoker].payload = table.querySelector('[id=payload]').value
            act2.built[invoker].column = table.querySelector('[id=sel_data]').value.split(",")
            act2.built[invoker].has_cond = table.querySelector('[id=cond_flip]').checked
            act2.built[invoker].type = table.querySelector('[id=cond_type]').value
            act2.built[invoker].cond = table.querySelector('[id=cond]').value
            //console.table(act2.built)
            generic.update_statement()
        },
        remove: function(){
            if (act2.unsafe_counter==1){
                return alert("need minium 1 ACT statement")
            }
            var main_link = document.getElementById("act_"+(act2.unsafe_counter-1))
            console.log(main_link)
            //cut
            //check for data to prevent accidental delete
            /*if (main_link.querySelector("select[id=sel_1_name]").value!="None"){
                alert("link "+(act2.unsafe_counter-1)+" table 1 has data")
                return
            }
            if (main_link.querySelector("select[id=sel_2_name]").value!="None"){
                alert("link "+(act2.unsafe_counter-1)+" table 2 has data")
                return
            }*/
            //remove the entry in html
            main_link.remove()
            //delete the last entry in built obj
            act2.built.pop()
            //log
            console.table(act2.built)
            act2.unsafe_counter -= 1
            generic.update_statement()
        },
    }
