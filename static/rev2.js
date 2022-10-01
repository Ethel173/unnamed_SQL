
    var generic={
        togg:function(pos){
        var toggle = document.getElementById(pos+'_chunk')
        console.log("toggle"+ toggle)
        if (toggle.className == 'togg_on')
        {toggle.className = 'togg_off'}
        else
        {toggle.className = 'togg_on'}
        
    },
    log :function(asd){
        console.log(asd)
    }
    }

    var table = {
        saved_cols : [],

        pop_cols: function(arg){
            table.saved_cols.push(arg)
        }

    }