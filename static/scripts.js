

var generator = {

    selbox_placeholder:'Select Me',
    selbox_none:'None',

    element_gen: function(pos,type,atts){
        //new div
        var new_data = document.createElement(type);
        //set attribues in atts
        for(var i in atts){
            /*
            console.log("key "+i)
            console.log("bal "+atts[i])
            */
            new_data.setAttribute(`${[i]}`, [atts[i]])
        }
        //append the new div
        document.getElementById(pos).appendChild(new_data)
    },    
    //only really used for <p> divs right now
    //uses a different append method for its payload
    node_gen: function(pos,type,atts,payload){
        
        var new_data = document.createElement(type);
        for(var i in atts){
            /*
            console.log("key "+i)
            console.log("bal "+atts[i])
            */
            new_data.setAttribute(`${[i]}`, [atts[i]])
        }
        new_data.appendChild(document.createTextNode(payload))
        document.getElementById(pos).appendChild(new_data)
    },

    selbox_gen: function(atts,pos,placeholder=true,mandatory=false)
    {
        //console.log(generator.selbox_default)
        //console.log("len" + (generator.selbox_default.length -1))
        generator.element_gen(pos,'select',atts)

        if (placeholder == true){
            generator.selbox_add_placeholder(atts['id'])
        }
        if (mandatory == false){
            generator.selbox_add_mandatory(atts['id'])
        }
    },
    //takes the selbox itself
    selbox_add_placeholder: function(pos)
    {
        //console.log('position: '+pos)
        var option = document.createElement("option");
        option.value = generator.selbox_none
        option.hidden = true
        option.text = generator.selbox_placeholder
        document.getElementById(pos).appendChild(option);
    },
    //takes the selbox itself
    selbox_add_mandatory: function(pos){
        var option = document.createElement("option");
        option.value = generator.selbox_none
        option.text = generator.selbox_none
        document.getElementById(pos).appendChild(option);
    },
    //takes the selbox itself
    //append_me is a []
    selbox_append: function(pos,append_me){
        //console.log('in funct: '+ append_me)
        if(Array.isArray(append_me)){
            for (var selection = 0; selection <= (append_me.length-1);selection++){
                var option = document.createElement("option");
                /*    
                console.log('selection count: ' + selection)
                console.log('selection: ' + generator.selbox_default[selection])
                console.log('id target: ' + atts['id'])
                */
                option.value = append_me[selection]
                option.text = append_me[selection]
                document.getElementById(pos).appendChild(option);
            }
        }
    },

    ///wtf am i doing here
    //FUTURE ME MAKE SURE THIS CHUNK IS UNNNEDED BEFORE YEETING IT
    //PAST YOU THINKS ITS FINE THO
    /*
    selbox_init:function(pos,placeholder=true,mandatory=false,data){
        //alert('refresh:' +pos)
        if (placeholder){
            generator.selbox_add_placeholder(pos)
        }
        if (!mandatory){
            generator.selbox_add_mandatory(pos)
        }
        generator.selbox_append(pos,table.saved_tables)
    }*/

}


var table = {

    template :{
        id_prefix: "tab_",
        content_post: "content",
        div: "_div",
        row: "_row",
        col: "_col",
        label: "_label",
        name: "_name",
        display_name_text : "Name",
        display_col_text : "colums",
        display_col_placeholder : "(CSV format)",
    },

    unsaved_counter:2,
    saved_counter:2,

    saved_tables : {
            1: {
                name: "TT1",
                raw: [
                    "T1F1"
                ],
            },
            2: {
                name: "TT2",
                raw: [
                    "T2F1",
                    "T2F2"
                ],
            }
    },

    add: function() {
        //increment counter
        table.unsaved_counter += 1
        //console.log("main: ",control)
        
        //create new div
        generator.element_gen(
        'tab_content',
        'div',
        {"id": `${table.template.id_prefix}${table.unsaved_counter}${table.template.div}`,
        "class": `container text-center`})

        //create new row
        generator.element_gen(
        `${table.template.id_prefix}${table.unsaved_counter}${table.template.div}`
        ,'div',
        {"id": `${table.template.id_prefix}${table.unsaved_counter}${table.template.div}${table.template.row}`,
        "class": `row`})


       //create new label
        generator.node_gen(
            pos = `${table.template.id_prefix}${table.unsaved_counter}${table.template.div}${table.template.row}`,
            type = 'p',
            atts = {
                "id": `${table.template.id_prefix}${table.unsaved_counter}${table.template.name}${table.template.label}`,
                "class": `col`
            },
            payload =`table ${table.unsaved_counter} ${table.template.display_name_text}`
            )


        //create name input field
        generator.element_gen(
            pos =`${table.template.id_prefix}${table.unsaved_counter}${table.template.div}${table.template.row}`,
            type ='input',
            atts={
                "id": `${table.template.id_prefix}${table.unsaved_counter}${table.template.name}`,
                "class": `col`,
                "value":'',
                "placeholder":`table ${table.unsaved_counter} name`,
                "type":'text'
            }
        )
        
        //create new label
        generator.node_gen(
            pos = `${table.template.id_prefix}${table.unsaved_counter}${table.template.div}${table.template.row}`,
            type = 'p',
            atts = {
                "id": `${table.template.id_prefix}${table.unsaved_counter}${table.template.col}${table.template.label}`,
                "class": `col`
            },
            payload =`table ${table.unsaved_counter} ${table.template.display_col_text}`
        )
        
        //create col input field
        generator.element_gen(
            `${table.template.id_prefix}${table.unsaved_counter}${table.template.div}${table.template.row}`,
            'input',
            {
                "id": `${table.template.id_prefix}${table.unsaved_counter}${table.template.col}`,
                "class": `col`,
                "type":'text',
                "value":'',
                "placeholder":table.template.display_col_placeholder,
            }
        )
    },

    remove: function() {
        //populate
        var work = document.getElementById(`${table.template.id_prefix}${table.unsaved_counter}${table.template.div}`)
        var work_name = document.getElementById(`${table.template.id_prefix}${table.unsaved_counter}${table.template.name}`)
        var worl_col = document.getElementById(`${table.template.id_prefix}${table.unsaved_counter}${table.template.col}`)
        //checks to prevent unintended yeets
        if (table.unsaved_counter == 1){
            return alert(`cannot remove primary table`)
        }
        if (work_name.value != ''){
            return alert(`table ${table.unsaved_counter} 'name' field has text`)
        }
        if (worl_col.value != ''){
            return alert(`table ${table.unsaved_counter} 'colums' field has text`)
        }
        //rem div
        work.remove()
        //remove entry in active_Tables
        delete table.saved_tables[`${table.unsaved_counter}`]
        //update danger counter
        table.unsaved_counter -=1
        //update saved tables
        table.save()
        //refresh links selection
        link.refresh()
    },


    //writes table data to memory
    save:function(){
        table.saved_counter = table.unsaved_counter
        //console.log("SAV "+table.unsaved_counter )
        //CHANGE ME BACK TO 1 WHEN DONE WITH TEST TABLES
        for (var i = 3; i <= table.unsaved_counter; i++){
            var name = document.getElementById(`${table.template.id_prefix}${i}${table.template.name}`).value
            var cols = document.getElementById(`${table.template.id_prefix}${i}${table.template.col}`).value
        
        //checks for empty fields
        if (name == ''){
            return alert(`table ${i} 'name' field is blank`)
        }
        if (cols == ''){
            return alert(`table ${i} 'colums' field is blank`)
        }
        //splits for raw
        var col_split = cols.split(',')
        //local temp loop that holds raw tables before pushing to it
        var raw_cols = []
        for (var j = 0; j <= col_split.length-1;j++){
            raw_cols.push(col_split[j])
        }
        table.saved_tables[`${i}`] = {
            name : name,
            raw:raw_cols,
            }
        }
        //console.log("active tab obj",table)

        //refresh links selection
        link.refresh()
    }
}


var link = {
    content_template: {
        link_text : "(Colum A, Colum B)",
        link_name : "Join",
    },

    //CLEAR ME TO 0 AFTER DONE DEBUG
    active_counter:2,
    selected_links:{
        "link_1_table1": "T1F1",
        "link_1_table2": "T2F2",
        "link_1_sel": "RIGHT",
        "link_2_table1": "T2F1",
        "link_2_table2": "T2F2",
        "link_2_sel": "FULL"
    },

    add: function() {
        //DEBUG
        //console.log(`added tables`,link.selected_links)
        
        //increment counter
        link.active_counter += 1

        //console.log("main: ",control)
        
        //create new div
        generator.element_gen(
            pos ="link_content",
            type ='div',
            atts={
                "id": `link_${link.active_counter}${table.template.div}`,
                "class": `container text-center`
            }
        )
        //create new row
        generator.element_gen(
            pos =`link_${link.active_counter}${table.template.div}`,
            type ='div',
            atts={
                "id": `link_${link.active_counter}${table.template.div}${table.template.row}`,
                "class": `row`,
            }
        )
        //create new label
        generator.node_gen(
            pos = `link_${link.active_counter}${table.template.div}${table.template.row}`,
            type = 'p',
            atts = {
                "id": `link_${link.active_counter}${table.template.name}${table.template.label}`,
                "class": `col`
            },
            payload =`${link.content_template.link_name} ${link.active_counter}`
        )
        //create new input
        for (var table_counter=1; table_counter <= 2;table_counter++){
            //gen table box
            generator.selbox_gen(
                {
                    'id':`link_${link.active_counter}_table${table_counter}`,
                    "class": `col`
                },
                `link_${link.active_counter}${table.template.div}${table.template.row}`)

                link.populate(`link_${link.active_counter}_table${table_counter}`)
        }
        //create TYPE select box
        generator.selbox_gen({'id':`link_${link.active_counter}_sel`,"class": `col`},`link_${link.active_counter}${table.template.div}${table.template.row}`,placeholder=false,mandatory=true)
        //populate TYPE select box
        generator.selbox_append(`link_${link.active_counter}_sel`,["INNER","LEFT","RIGHT","FULL"]
        )
    },

    remove: function() {
        //populate
        var work = document.getElementById(`link_${link.active_counter}${table.template.div}`)
        var table_1 = document.getElementById(`link_${link.active_counter}_table1`)
        var table_2 = document.getElementById(`link_${link.active_counter}_table2`)
        //checks
        if (table_1.value != generator.selbox_none){
            return alert(`${link.content_template.link_name} ${link.active_counter}, field 1 has a selection`)
        }
        if (table_2.value != generator.selbox_none){
            return alert(`${link.content_template.link_name} ${link.active_counter}, field 2 has a selection`)
        }
        //logic
        work.remove()
        link.active_counter -= 1
    },

    refresh: function(){
        
        //REMEMBER TO RENABLE ME SINCE YOU HAVE DEBUG LINKS LOADED
        //clear
        //link.selected_links={}

        //update all link divs
        //CHANGE BACK TO 1 AFTER DONE WITH LOADED TABLES
        for (var i=3; i <= link.active_counter;i++)
        {
            //update both selections 1 and 2
            //console.log(`tried refershing link_${i}`)
            for (var j=1; j <= 2;j++){
                //append
                selected = document.getElementById(`link_${i}_table${j}`)
                //console.log('picked ', selected.value)
                prebuild ="link_"+i+"_table"+j
                //add link entry
                link.selected_links[prebuild] = selected.value
                link.repopulate_handler(
                    id = `link_${i}_table${j}`,
                    placeholder=true,
                    mandatory=false,
                    selections = link.selected_links,
                    )
                    //console.log(`tried refershing table${i},${j}`)
                }
                link_type = document.getElementById(`link_${i}_sel`)
                link.selected_links[`link_${i}_sel`] = link_type.value
                console.log(`added tables`,link.selected_links)
            
        }
        //console.log("SELLINKS ",link)
    },

    //takes the selbox itself
    //adds in loaded tables to selbox
    populate: function(pos,selections=[]){
        //console.log("SEL CHECK",selections)
        //console.log("SEL CHECK2",table)
        //console.log("SEL CHECK3",Object.keys(table.saved_tables).length)


        for(var tab_selection = 1; tab_selection <= table.saved_counter;tab_selection++){

            //TODO future me you have to deal with an undefined here
            //past you fixed it by table.sav before refreshing????
            //possible saved =/= unsaved counter??
            //it just works??
            console.log("subsel1", table.saved_tables[tab_selection])
            for(var sub_sel = 0; sub_sel < table.saved_tables[tab_selection].raw.length;sub_sel++){
                //console.log("subsel2", table.saved_tables[tab_selection].raw)
                //console.log("subsel3", table.saved_tables[tab_selection].raw[sub_sel])
                //console.log("populate key "+table.saved_tables[tab_selection].raw[sub_sel])
                var option = document.createElement("option")
                option.value = table.saved_tables[tab_selection].raw[sub_sel]

                //handles selected entry
                //i hate this
                if (selections.length!=0 && selections[pos] != "None" && selections[pos] == table.saved_tables[tab_selection].raw[sub_sel]){
                    //console.log("SEL CHECKIF 0",selections)
                    //console.log("SEL CHECKIF 2",option)
                    option.selected = 'selected'
                }

                option.text = table.saved_tables[tab_selection].raw[sub_sel] +" (" + table.saved_tables[tab_selection].name + ")"
                //console.log("POPULATE VAL",option.value)

            document.getElementById(pos).appendChild(option);
            }
        }
    },

    //intermediate func that adds placeholders and mandatory before calling populate
    repopulate_handler:function(pos,placeholder=false,mandatory=false,selections=[]){
        //console.log("REPOP caught",selections)
        //console.log("repop cleared:",pos)
        document.getElementById(pos).innerHTML=''

        //alert('refresh:' +pos)
        if (placeholder){
            generator.selbox_add_placeholder(pos)
        }
        if (!mandatory){
            generator.selbox_add_mandatory(pos)
        }
        link.populate(pos,selections)
    }
    
}


var act = {

    counter:0,
    template:{
        id_prefix: "act_",
        content_post: "content",
        div: "_div",
        row: "_row",
        col: "_col",
        label: "_label",
        name: "_name",
        display_name_text : "Name",
        display_col_text : "colums",
        display_col_placeholder : "(CSV format)",
    },

    saved:{},

    add: function(){
        //up counter
        act.counter +=1,
        //new div
        generator.element_gen(
            pos =`${act.template.id_prefix}${act.template.content_post}`,
            type ='div',
            atts={
                "id": `${act.template.id_prefix}${act.counter}${act.template.div}`,
                "class": `container text-center`
            }
        )
        //new row
        generator.element_gen(
            pos =`${act.template.id_prefix}${act.counter}${act.template.div}`,
            type ='div',
            atts={
                "id": `${act.template.id_prefix}${act.counter}${table.template.row}`,
                "class": `row`,
            }
        )
         //create new label
        generator.node_gen(
            pos = `${act.template.id_prefix}${act.counter}${table.template.row}`,
            type = 'p',
            atts = {
                "id": `${act.template.id_prefix}${act.counter}${table.template.row}${table.template.label}`,
                "class": `col`
            },
            payload =`${act.template.display_name_text} ${act.counter}`
        )
    },
    remove:function(){

    },
    save:function(){

    },
    refresh:function(pos,saved){

    }
}




    function togg(intake){
        var toggle = document.getElementById(intake+'_chunk')
        console.log("toggle"+ toggle)
        if (toggle.className == 'togg_on')
            {toggle.className = 'togg_off'}
        else
        {toggle.className = 'togg_on'}

    }
