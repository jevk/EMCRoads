function how_do_i_go() {
    clear_path()
    var from = document.getElementById("from").value
    var to   = document.getElementById("to"  ).value
    var l = pathfind(citiesL[from], citiesL[to])
    if (l == undefined) {
        document.getElementById("result").innerText = "path not found"
    } else {
        s = from
        for (var i = 0; i < l.length; i++) {
            s = s + "->" + l[i]
            
        }
        document.getElementById("result").innerText = s
        l.splice(0, 0, from)
        for (var i = 0; i < (l.length - 1); i++) {
            Object.keys(lineSeries).forEach(function(k) {
                lineSeries[k].mapLines.each(function (item) {
                    if ((item.route[0].tooltipText == l[i] && item.route[1].tooltipText == l[i + 1]) || (item.route[1].tooltipText == l[i] && item.route[0].tooltipText == l[i + 1])) {
                        console.log(item.id)
                        item.line.strokeDasharray = ""
                    }
                })
                
            });
        }
    }
}

function clear_path() {
    Object.keys(lineSeries).forEach(function(k) {
        lineSeries[k].mapLines.each(function (item) {
        item.line.strokeDasharray = "2 1"
        })
        
    });
}