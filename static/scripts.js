

var generator = {

    generic_gen: function(pos,type,atts){
        
        var new_data = document.createElement(type);
        
        for(var i in atts){
            /*
            console.log("key "+i)
            console.log("bal "+atts[i])
            */
            new_data.setAttribute(`${[i]}`, [atts[i]])
        }
        
        
        
        document.getElementById(pos).appendChild(new_data)
    },    
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


    selbox_placeholder:'Select Me',
    selbox_none:'None',

    selbox_gen: function(atts,pos,placeholder=true,mandatory=false)
    {
        //console.log(generator.selbox_default)
        //console.log("len" + (generator.selbox_default.length -1))
        generator.generic_gen(pos,'select',atts)

        if (placeholder == true){
            generator.selbox_gen_placeholder(atts['id'])
        }

        if (mandatory == false){
            generator.selbox_not_mandatory(atts['id'])
        }
    },
    //takes the selbox itself
    selbox_gen_placeholder: function(pos)
    {
        //console.log('position: '+pos)
        var option = document.createElement("option");
        option.value = generator.selbox_none
        option.hidden = true
        option.text = generator.selbox_placeholder
        document.getElementById(pos).appendChild(option);
    },
    //takes the selbox itself
    selbox_not_mandatory: function(pos){
        var option = document.createElement("option");
        option.value = generator.selbox_none
        option.text = generator.selbox_none
        document.getElementById(pos).appendChild(option);
    },
    //takes the selbox itself
    selbox_append: function(pos,append_me){
        //console.log('in funct: '+ append_me)
        if(Array.isArray(append_me)){
            //console.log('in array: '+ append_me)
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
    selbox_init:function(pos,placeholder=true,mandatory=false,data){
        //alert('refresh:' +pos)
        if (placeholder){
            generator.selbox_gen_placeholder(pos)
        }
        if (!mandatory){
            generator.selbox_not_mandatory(pos)
        }
        generator.selbox_append(pos,table.active)
    }

}


var table = {

    content_template :{
        name_text : "Name",
        col_text : "colums",
        col_placeholder : "(CSV format)",
    },

    active : {
            counter:2,
            saved_counter:2,
            1: {
                name: "TT1",
                counter:1,
                raw: [
                    "T1F1"
                ],
                packed: "TT1.T1F1 "
            },
            2: {
                name: "TT2",
                counter:2,
                raw: [
                    "T2F1",
                    "T2F2"
                ],
                packed: "TT2.T2F1 TT2.T2F1 "
            }
    },

    add: function() {
        //increment counter
        table.active.counter += 1
        //console.log("main: ",control)
        
        //create new div
        generator.generic_gen('tab_content','div',{"id": `tab_${table.active.counter}_div`,"class": `container text-center`})
        /*
        var new_tab_div = document.createElement("div");
        new_tab_div.setAttribute("id", `tab_${table.active.counter}_div`)
        new_tab_div.setAttribute("class", `container text-center`)
        document.getElementById("tab_content").appendChild(new_tab_div)
        */
       //create new row
        generator.generic_gen(`tab_${table.active.counter}_div`,'div',{"id": `tab_${table.active.counter}_div_row`,"class": `row`})
        /*
        var new_tab_div_row = document.createElement("div");
        new_tab_div_row.setAttribute("id", `tab_${table.active.counter}_div_row`)
        new_tab_div_row.setAttribute("class", `row`)
        document.getElementById(`tab_${table.active.counter}_div`).appendChild(new_tab_div_row)
        */

       //create new label
        generator.node_gen(
            pos = `tab_${table.active.counter}_div_row`,
            type = 'p',
            atts = {
                "id": `tab_${table.active.counter}_name_label`,
                "class": `col`
            },
            payload =`table ${table.active.counter} ${table.content_template.name_text}`
            )


        //create name input field
        generator.generic_gen(
            pos =`tab_${table.active.counter}_div_row`,
            type ='input',
            atts={
                "id": `tab_${table.active.counter}_name`,
                "class": `col`,
                "value":'',
                "placeholder":`table ${table.active.counter} name`,
                "type":'text'
            })
        
        //create new label
        generator.node_gen(
            pos = `tab_${table.active.counter}_div_row`,
            type = 'p',
            atts = {
                "id": `tab_${table.active.counter}_col_label`,
                "class": `col`
            },
            payload =`table ${table.active.counter} ${table.content_template.col_text}`
            )
       
        //create col input field
        generator.generic_gen(
            `tab_${table.active.counter}_div_row`,
            'input',
            {
                "id": `tab_${table.active.counter}_col`,
                "class": `col`,
                "type":'text',
                "value":'',
                "placeholder":table.content_template.col_placeholder,
            })


    },

    remove: function() {
        //populate
        var work = document.getElementById(`tab_${table.active.counter}_div`)
        var work_name = document.getElementById(`tab_${table.active.counter}_name`)
        var worl_col = document.getElementById(`tab_${table.active.counter}_col`)
        //checks
        if (table.active.counter == 1){
            return alert(`cannot remove primary table`)
        }

        if (work_name.value != ''){
            return alert(`table ${table.active.counter} 'name' field has text`)
        }

        if (worl_col.value != ''){
            return alert(`table ${table.active.counter} 'colums' field has text`)
        }
        //logic
        work.remove()
            //remove entry in active_Tables
        delete table.active[`tab_${table.active.counter}`]
        table.active.counter -=1
    },


    //todo its saving delted table entries
    save:function(){

        table.active.saved_counter = table.active.counter
        console.log("SAV "+table.active.counter )
        //CHANGE ME BACK TO 1 WHEN DONE WITH TEST TABLES
        for (var i = 3; i <= table.active.counter; i++){
            var name = document.getElementById(`tab_${i}_name`).value
            var cols = document.getElementById(`tab_${i}_col`).value

            
        if (name == ''){
            return alert(`table ${i} 'name' field is blank`)
        }

        if (cols == ''){
            return alert(`table ${i} 'colums' field is blank`)
        }

            var col_split = cols.split(',')
            var built_cols = ''
            var raw_cols = []
            for (var j = 0; j <= col_split.length-1;j++){
                raw_cols.push(col_split[j])
                built_cols = built_cols + name+'.'+ col_split[j]+' '
            }
            table.active[`${i}`] = {
                name : name,
                counter:j,
                raw:raw_cols,
                packed: built_cols,}
        }
        console.log("active tabs",table.active)
    }
}


var link = {

    content_template: {
        link_text : "(Colum A, Colum B)",
        link_name : "Join",
    },

    active : {
        counter:0
        },

    selected_links:{},


    add: function() {
        //increment counter
        link.active.counter += 1
        //console.log("main: ",control)

        //create new div
        generator.generic_gen(
            pos ="link_content",
            type ='div',
            atts={
                "id": `link_${link['active']['counter']}_div`,
                "class": `container text-center`
            })
        
        
        //create new row
        generator.generic_gen(
            pos =`link_${link['active']['counter']}_div`,
            type ='div',
            atts={
                "id": `link_${link['active']['counter']}_div_row`,
                "class": `row`,
            })

        //create new label
        generator.node_gen(
            pos = `link_${link['active']['counter']}_div_row`,
            type = 'p',
            atts = {
                "id": `link_${link['active']['counter']}_name_label`,
                "class": `col`
            },
            payload =`${link.content_template.link_name} ${link['active']['counter']}`
            )

        //create new input

        for (var table_counter=1; table_counter <= 2;table_counter++){
        //gen table box
        generator.selbox_gen(
            {
                'id':`link_${link['active']['counter']}_table${table_counter}`,
                "class": `col`
            },
            `link_${link['active']['counter']}_div_row`)
            //gen sel 1
            generator.selbox_init(
                pos = `link_${link['active']['counter']}_table${table_counter}`,
                placeholder=true,
                mandatory=false,
                data=table.active
            )
            link.populate(`link_${link['active']['counter']}_table${table_counter}`)
        }

        //create TYPE select box
        generator.selbox_gen({'id':`link_${link['active']['counter']}_sel`,"class": `col`},`link_${link['active']['counter']}_div_row`,placeholder=false,mandatory=true)
        //populate TYPE select box
        generator.selbox_append(`link_${link['active']['counter']}_sel`,["INNER","LEFT","RIGHT","FULL"])

    },

    remove: function() {
        //populate
        var work = document.getElementById(`link_${link['active']['counter']}_div`)
        var table_1 = document.getElementById(`link_${link['active']['counter']}_table1`)
        var table_2 = document.getElementById(`link_${link['active']['counter']}_table2`)
        //checks
        if (table_1.value != generator.selbox_none){
            return alert(`${link.content_template.link_name} ${link['active']['counter']}, field 1 has a selection`)
        }
        if (table_2.value != generator.selbox_none){
            return alert(`${link.content_template.link_name} ${link['active']['counter']}, field 2 has a selection`)
        }
        //logic
        work.remove()
        link.active.counter -= 1
    },

    refresh: function(){
        //clear
        link.selected_links={}

        for (var i=1; i <= link.active.counter;i++)
        {
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
                    //console.log(`added tables`,link.selected_links)
                }
            
        }
        //console.log("SELLINKS ",link)
    },
    //takes the selbox itself
    populate: function(pos,selections=[]){
        console.log("SEL CHECK",selections)

        for(var tab_selection = 1; tab_selection <= table.active.saved_counter;tab_selection++){
            /*console.log("POPULATE"+JSON.stringify(tab_selection))
            console.log("POPULATE"+JSON.stringify(table.active[tab_selection]))
            console.log("POPULATE"+JSON.stringify(table.active[tab_selection].raw))
            */
            for(var sub_sel =0; sub_sel < table.active[tab_selection].raw.length;sub_sel++){

                //console.log("populate key "+table.active[tab_selection].raw[sub_sel])
                var option = document.createElement("option")
                option.value = table.active[tab_selection].raw[sub_sel]

                //handles selected entry
                //i hate this
                if (selections.length!=0 && selections[pos] != "None" && selections[pos] == table.active[tab_selection].raw[sub_sel]){
                    //console.log("SEL CHECKIF 0",selections)
                    //console.log("SEL CHECKIF 2",option)
                    option.selected = 'selected'
                }

                option.text = table.active[tab_selection].raw[sub_sel] +" (" + table.active[tab_selection].name + ")"
                //console.log("POPULATE VAL",option.value)

            document.getElementById(pos).appendChild(option);
            }
        }
    },

    repopulate_handler:function(pos,placeholder=false,mandatory=false,selections=[]){
        console.log("REPOP caught",selections)
        console.log("repop cleared:",pos)
        document.getElementById(pos).innerHTML=''

        //alert('refresh:' +pos)
        if (placeholder){
            generator.selbox_gen_placeholder(pos)
        }
        if (!mandatory){
            generator.selbox_not_mandatory(pos)
        }
        link.populate(pos,selections)
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
