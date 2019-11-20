function how_do_i_go() {
    var from = document.getElementById("from").value
    var to   = document.getElementById("to"  ).value
    var l = pathfind(citiesL[from], citiesL[to])
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
    console.log(l)
}