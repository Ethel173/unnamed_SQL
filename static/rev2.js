
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
        act.add()

    }
    }

    var table = {
        unsafe_counter:0,
        built_obj : [],
        map: function(names,cols){
            for (var asd in names){
                table.built_obj.push(names[asd])
                table.built_obj[asd].push(cols[asd])
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
            clone.querySelector('div.col').innerHTML = "Table : " + table.built_obj[table.unsafe_counter][0];
            var selbox_div = document.createElement("div")
            selbox_div.setAttribute("class", "col")
            var selectbox = document.createElement("select")
            selectbox.setAttribute("id", "data"+table.unsafe_counter)

            for (var item = 0; item < table.built_obj[table.unsafe_counter][1].length;item ++){
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
        clone.querySelector('select[id=sel_1_name]').setAttribute("onchange", "link.pop_sub_table("+"'"+link.unsafe_counter+"','1')")
        clone.querySelector('select[id=sel_2_name]').setAttribute("onchange", "link.pop_sub_table("+"'"+link.unsafe_counter+"','2')")

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

        link.unsafe_counter++
        document.getElementById("link_content").appendChild(clone); 
    },

    pop_sub_table:function(invoker,subtab)
    {
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
    },
    //abandoned
    /*
    check_unlock: function(invoker){
        if (invoker != 0)
        {
            console.log("check_unlock " , invoker)
            var main_link = document.getElementById("link_"+(invoker-1))
            var subname1 = main_link.querySelector("select[id=sel_1_name]")
            var subname2 = main_link.querySelector("select[id=sel_2_name]")
            if (subname1.value== '' || subname1.value=="None"|| subname2.value== '' || subname2.value=="None"){
                var unlock = document.getElementById("link_"+(invoker))
                unlock.querySelector("select[id=sel_1_name]").removeAttribute("disabled")
                unlock.querySelector("select[id=sel_2_name]").removeAttribute("disabled")
                return
            }
            var unlock = document.getElementById("link_"+(invoker))
            unlock.querySelector("select[id=sel_1_name]").setAttribute("disabled","True")
            unlock.querySelector("select[id=sel_2_name]").setAttribute("disabled","True")
        }
    }*/

},
act={
    unsafe_counter:0,

    add: function(){
        let templateInstance = document.getElementById("act_template");
        let clone = document.importNode(templateInstance .content, true);
        clone.querySelector('div.row').setAttribute("id", "act_"+act.unsafe_counter)
        clone.querySelector('div.col').innerHTML = "act "+act.unsafe_counter
        
        //setup on change events
        clone.querySelector('select[id=sel_name]').setAttribute("onchange", "act.pop_sub_table("+"'"+act.unsafe_counter+"')")
        clone.querySelector('select[id=sel_data]').setAttribute("onchange", "act.unlock_cond('"+act.unsafe_counter+"')")

        for (var item = 0; item < table.built_obj.length;item ++){
            var option = document.createElement("option");
            option.value = item
            option.text = table.built_obj[item][0]
            clone.querySelector('select[id=sel_name]').appendChild(option);
        }

        act.unsafe_counter++
        document.getElementById("act_content").appendChild(clone); 
    },
    pop_sub_table:function(invoker)
    {
        var main_table = document.getElementById("act_"+invoker)
        var subname = main_table.querySelector("select[id=sel_name]")
        var subtable = main_table.querySelector("select[id=sel_data]")

        //depopulate all but "SELECT ME" option
        while (subtable.options.length > 1) {
            subtable.remove(1);
        }
        //check that there is a table to pull from or user chose 'None'
        if (subname.value== '' || subname.value=="None"){
            subtable.setAttribute("disabled","True")
            subtable.options[0].selected = true
            act.unlock_cond(invoker)
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

    unlock_cond:function(invoker){
        var main_table = document.getElementById("act_"+invoker)
        var check = main_table.querySelector("select[id=sel_name]")
        var subtable = main_table.querySelector("input")
        if (check.value== '' || check.value=="None"){
            subtable.setAttribute("placeholder", subtable.value)
            subtable.setAttribute("disabled","True")
            return
        }
        subtable.removeAttribute("disabled")
    }
}