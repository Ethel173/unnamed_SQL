
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
        for (item in names){
            table.add()
        }
        link.add()
        act.add()
        generic.update_statement()
    },
    update_statement:function()
    {
        act = document.getElementById("act_0")
        statement = act.querySelector("select[id=payload]").value
        tab_name = act.querySelector("select[id=sel_name]").value
        tab_data = act.querySelector("select[id=sel_data]").value
        if (generic.failcheck(statement)){
            console.info("failed statement check")
            generic.incomplete_statment("Act statement")
            return
        }
        console.info("passed statement check")
        
        generic.valid_statment(statement)
    },
    failcheck:function(test){
        if (test == null || test == "None" || test == ""){
            return true
        }
    },
    incomplete_statment:function(errcode){
        let out_div = document.getElementById("output")
        placeholder =" not selected"
        out_div.innerHTML = errcode+placeholder
    },
    valid_statment:function(statement){
        let out_div = document.getElementById("output")
        out_div.innerHTML = statement
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
        unsafe_counter:0,
        mem_template:{sel1:[],sel1data:[],sel2:[],sel2data:[]},
        built:[],
    add: function(){
        //handles safety logic
        if (link.unsafe_counter != 0){
            for (let index = 1; index <= link.unsafe_counter; index++) {
                var check_table = document.getElementById("link_"+(index-1))
                var subname1 = check_table.querySelector("select[id=sel_1_data]")
                var subname2 = check_table.querySelector("select[id=sel_2_data]")
                if (subname1.value== '' || subname1.value=="None"){
                    alert("select link "+(index-1)+" table 1 data first")
                    return
                }
                if (subname2.value== '' || subname2.value=="None"){
                    alert("select link "+(index-1)+" table 2 data first")
                    return
                }
            }
        }


        let templateInstance = document.getElementById("link_template");
        let clone = document.importNode(templateInstance .content, true);
        clone.querySelector('div.row').setAttribute("id", "link_"+link.unsafe_counter)
        //past you is being efficient
        //display text
        clone.querySelector('div.col').innerHTML = "link "+link.unsafe_counter
        
        //setup on change event
        clone.querySelector('select[id=sel_1_name]').setAttribute("onchange", "link.pop_sub_table("+"'"+link.unsafe_counter+"','1'),link.mem_update("+link.unsafe_counter+",1,1)")
        clone.querySelector('select[id=sel_2_name]').setAttribute("onchange", "link.pop_sub_table("+"'"+link.unsafe_counter+"','2'),link.mem_update("+link.unsafe_counter+",2,1)")
        clone.querySelector('select[id=sel_1_data]').setAttribute("onchange", "link.mem_update("+link.unsafe_counter+",1,2)")
        clone.querySelector('select[id=sel_2_data]').setAttribute("onchange", "link.mem_update("+link.unsafe_counter+",2,2)")

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
    console.table(link.built)
    link.built[link.unsafe_counter] = link.mem_template
        link.unsafe_counter++
    },

    pop_sub_table:function(invoker,subtab)
    {
        generic.update_statement()
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
    pop_sub_table_info:function(invoker,subtab)
    {
        generic.update_statement()
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

        main_link.remove()
        link.unsafe_counter -= 1
        generic.update_statement()
    },


    /////HERE
    mem_update:function(invoker,main,sub){
    var table = document.getElementById("link_"+invoker)
    var updater = table.querySelector('select[id=sel_1_name]').value
    }

},
act={
    unsafe_counter:0,

    add: function(){
        let templateInstance = document.getElementById("act_template");
        let clone = document.importNode(templateInstance .content, true);
        clone.querySelector('div.row').setAttribute("id", "act_"+act.unsafe_counter)
        clone.querySelector('div.col').innerHTML = "act "+act.unsafe_counter
        
        //idk 
        //these just cant be called as methods for some reason
        //setup on change events
        clone.querySelector('select[id=sel_name]').setAttribute("onchange", "act_pop_actdata("+""+act.unsafe_counter+")")
        clone.querySelector('select[id=sel_data]').setAttribute("onchange", "act_unlock_cond('"+act.unsafe_counter+"')")

        for (var item = 0; item < table.built_obj.length;item ++){
            var option = document.createElement("option");
            option.value = item
            option.text = table.built_obj[item][0]
            clone.querySelector('select[id=sel_name]').appendChild(option);
        }

        act.unsafe_counter++
        document.getElementById("act_content").appendChild(clone); 
    },


    
}

//i dunno it just needs to be outside act for some reason
function act_pop_actdata(invoker){
    generic.update_statement()
    var main_table = document.getElementById("act_"+invoker)
    var subname = main_table.querySelector("select[id=sel_name]")
    var subtable = main_table.querySelector("select[id=sel_data]")

    //depopulate all but SELECT ME and ALL
    while (subtable.options.length > 2) {
        subtable.remove(2);
    }
    //check that there is a table to pull from or user chose 'None'
    if (subname.value== '' || subname.value=="None"){
        subtable.setAttribute("disabled","True")
        subtable.options[0].selected = true
        act_unlock_cond(invoker)
        return
    }
    subtable.removeAttribute("disabled")
    for (var item = 0; item < table.built_obj[subname.value][1].length;item ++){
        var option = document.createElement("option");
        option.value = [subname.value,item]
        option.text = table.built_obj[subname.value][1][item][1]
        subtable.appendChild(option);
    }
}
function act_unlock_cond(invoker){
    var main_table = document.getElementById("act_"+invoker)
    var check = main_table.querySelector("select[id=sel_name]")
    console.log(check)
    var subtable = main_table.querySelector("input")
    if (check.value== '' || check.value=="None"){
        //subtable.setAttribute("placeholder", subtable.value)
        subtable.setAttribute("disabled","True")
        return
    }
    subtable.removeAttribute("disabled")
}