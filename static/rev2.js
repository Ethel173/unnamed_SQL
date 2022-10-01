
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
            //generic.debug()
        },

        add:function(){
            console.log("try add template")
            var temp = document.getElementById("table_template")
            var clon = temp.content.cloneNode(true)
            document.getElementById("tab_content").appendChild(clon)
        },


        startup:function(names,cols){
            table.map(names,cols)
            for (item in names){
                table.add()
            }
        }
    }