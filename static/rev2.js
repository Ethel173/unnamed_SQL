
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
        repop : [],
        
        data_pop_test: function(arg){
            table.repop.push(arg)
        }

    }