function how_do_i_go() {
    clear_path()
    var from = document.getElementById("from").value
    var to   = document.getElementById("to"  ).value
    var l = pathfind(citiesL[from], citiesL[to])
    console.log(l)
    if (l == false) {
        document.getElementById("result").innerText = "Path not found"
        document.getElementById("result").style.display = "block"
        return;
    } else {
        s = ""
        document.getElementById("result").innerText = ""
        document.getElementById("result").style.display = "grid"
    }
    l.unshift([l[0][0], "foot"])
    fracs = []
    document.getElementById("result").style.gridTemplateRows = "1fr 1fr ".repeat(l.length)
    console.log(document.getElementById("result").style.gridTemplateRows)
    s += `<div class="background-path-line none" style="grid-column-start: 1; grid-column-end: 2; grid-row-start: ${i * 2 + 2}; grid-row-end: ${i * 2 + 3}"></div>`
    for (var i = 0; i < (l.length - 1); i++) {
        var from = l[i]
        var to = l[i + 1]
        SIZE_CONST = 0.1
        fracs.push(l[l.length - 1 - i][2] * SIZE_CONST)
        fracs.push(l[l.length - 1 - i][2] * SIZE_CONST)
        if (i == 0) {
            s += `<div class="background-path-line ${from[1]}" style="grid-column-start: 1; grid-column-end: 2; grid-row-start: ${i * 2 + 2}; grid-row-end: ${i * 2 + 3}"></div>`

        } else {
            s += `<div class="background-path-line ${from[1]}" style="grid-column-start: 1; grid-column-end: 2; grid-row-start: ${i * 2 + 1}; grid-row-end: ${i * 2 + 3}"></div>`
        }
        s += `<div clss="path-item" style="grid-column-start: 2; grid-column-end: 3; grid-row-start: ${i * 2 + 2}; grid-row-end: ${i * 2 + 4}">${to[0]}</div>`
        
    }
    for (var i = 0; i < l.length; i++) {
        l[i] = l[i][0]
    }
    fracs = fracs.slice(2)
    total = 0
    for (var i = 0; i < fracs.length; i++) {
        total += fracs[i]
    }
    console.log(total)
    factor = 90 / total
    for (var i = 0; i < fracs.length; i++) {
        fracs[i] = fracs[i] * factor
    }

    document.getElementById("result").innerHTML = s
    console.log(fracs)
    document.getElementById("result").style.gridTemplateRows = fracs.join('% ') + "%"
    console.log(document.getElementById("result").style.gridTemplateRows)
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

function clear_path() {
    updateMapLines()
    document.getElementById("result").innerHTML = ""
}

function control_open() {
  document.getElementById("control-panel").style.display = "block";
  document.getElementById("control-show").style.display = "none";

}

function control_close() {
  document.getElementById("control-panel").style.display = "none";
  document.getElementById("control-show").style.display = "block";

  document.body.style.gridTemplateColumns = "2fr 0fr"
}