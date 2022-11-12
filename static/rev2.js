
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
        link.add()
        act2.add()

        //dont need this at startup
        //generic.update_statement()

        //cheeky little lazy hack
        generic.incomplete_statment("ACT table Not Completed")
    },

    background_tracker :  65,
    background_tables : {},
    main_table : "",
    frontend_tables : [],
    join_links : [],


    update_statement:function()
    {
        
    //add ACT AS 'A'
    //add link tables to loaded tabs AS 'B','C','D' etc
    //your gonna do this backwards KV pairs with table as Key
    
    //clear new batch    
    generic.reset_tables()
    //act section
    try{
        for (var i = 0; i < act2.unsafe_counter; i++)
        {
            table_sel = act2.built[i]["column"][0]
            generic.try_add_to_background(table_sel)
            generic.main_table = table_sel
            //console.log("background tables:")
            //console.table(generic.background_tables)
        }
    }
        catch{
            generic.incomplete_statment("ACT table Not Completed")
            return
        }
    //links section
    try{
        for (var i = 0; i < link.unsafe_counter; i++)
        {
            sel1 = link.built[i].sel1data[0]
            sel2 = link.built[i].sel2data[0]

            if (sel1 == undefined || sel2 == undefined||sel1 == "None" || sel2 == "None"||sel1 == "" || sel2 == ""){
                return
            }

            generic.try_add_to_background(sel1)
            generic.frontend_tables.push(sel1)
            generic.join_links.push(link.built[i].sel1data[1])

            generic.try_add_to_background(sel2)
            generic.frontend_tables.push(sel2)
            generic.join_links.push(link.built[i].sel2data[1])
            
        }
    }
        catch{
            generic.incomplete_statment("Table Link Not Completed")
            return
        }
        console.info("background tables:")
        console.table(generic.background_tables)

    //add link joins
    // you can chain those


        //past me wtf is this
        //DONT DELETE ME YET
        
        var rotating_statement = "SELECT"

        if(act2.built[0].column[1]=="ALL"){
            rotating_statement = rotating_statement + " * FROM " + generic.main_table + " AS " + generic.background_tables[generic.main_table]
            
        }
        else{
            rotating_statement = rotating_statement + " " + generic.background_tables[generic.main_table] + "." + act2.built[0].column[1] + " FROM " + generic.main_table + " AS " + generic.background_tables[generic.main_table]
        }

            /*if (generic.failcheck(cond_dat)){
                console.error("failed statement check")
                console.error("pass " + i)
                console.error("cond")
                return
            }
            console.info("passed statement check pass "+i)
            console.table(table.built_obj)
            //append ACT
            rotating_statement = pay_dat +" "
            //append primary table
            if(col_dat[1]=="ALL"){
                rotating_statement = rotating_statement + "* FROM " + table.built_obj[col_dat[0]][0]
            }
            else{
                rotating_statement = rotating_statement + table.built_obj[col_dat[0]][1][1][1] + " FROM " + table.built_obj[col_dat[0]][0]
            }
            if(cond_dat != ''||cond_dat != 'None'||cond_dat != null){
                rotating_statement = rotating_statement + " WHERE " +cond_dat
            }
        }
        if(link.has_links==true){
            rotating_statement = rotating_statement + " JOIN " + "TEST STATEMENT"
        }*/


        
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
        generic.background_tables = {}
        //this doesnt actually need to be cleared?
        generic.main_table = ""
        generic.frontend_tables = []
        generic.join_links = []
    },
    try_add_to_background:function(tab_name){
        if (tab_name in generic.background_tables){
            console.warn(tab_name + " already loaded into tables")
            return
        }
        generic.background_tables[tab_name] = String.fromCharCode(generic.background_tracker)
        generic.background_tracker += 1
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
        /**obj in mem with the selected actions, your dumb and setup the info for this in act obj update */
        built:[],
        /**adds new act to webpage */
        add:function(){
            let templateInstance = document.getElementById("act_template");
            let clone = document.importNode(templateInstance .content, true);
            clone.querySelector('div.row').setAttribute("id", "act_"+act2.unsafe_counter)
            clone.querySelector('div.col').innerHTML = "act "+act2.unsafe_counter
            
            //setup on change events
            clone.querySelector('select[id=payload]').setAttribute("onchange", "act2.obj_update("+act2.unsafe_counter+")")
            clone.querySelector('select[id=sel_name]').setAttribute("onchange", "act2.pop_actdata("+""+act2.unsafe_counter+"),act2.obj_update("+act2.unsafe_counter+")")
            clone.querySelector('select[id=sel_data]').setAttribute("onchange", "act2.obj_update("+act2.unsafe_counter+")")
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
            if (check.checked == false){
                //subtable.setAttribute("placeholder", subtable.value)
                subtable.setAttribute("disabled","True")
                prefix_sub.setAttribute("disabled","True")
                return
            }
            subtable.removeAttribute("disabled")
            prefix_sub.removeAttribute("disabled")
        },
        obj_update:function(invoker){
            //console.table(act2.built)
            //console.log("PREPROCESS")
            var table = document.getElementById("act_"+invoker)
            //console.log("invoker:" + invoker)
            //console.log(table)
            act2.built[invoker].payload = table.querySelector('[id=payload]').value
            //act2.built[invoker].table = table.querySelector('[id=sel_name]').value
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
            //fure me problem
            //future you ignoring this since reverse feature creep is locking it to 1 act for assignment
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
