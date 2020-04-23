

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    if (hours != 0)  {hours += ":"} else {hours = ""}
    if (minutes != 0)  {minutes += ":"} else {minutes = ""}
    return hours+minutes+seconds;
}

function how_do_i_go() {
    clear_path()
    var from = document.getElementById("from").value
    var to   = document.getElementById("to"  ).value
    window.path_buff = []
    pathfind(citiesL[to], citiesL[from])

    l = window.path_buff
    if (l == false) {
        document.getElementById("result").innerText = "Path not found"
        document.getElementById("result").style.display = "block"
        return;
    } else {
        s = ""
        document.getElementById("result").innerText = ""
        document.getElementById("result").style.display = "grid"
    }
    fracs = []
    document.getElementById("result").style.gridTemplateRows = "1fr 1fr ".repeat(l.length)
    console.log(document.getElementById("result").style.gridTemplateRows)
    s += `<div class="background-path-line none" style="grid-column-start: 1; grid-column-end: 2; grid-row-start: ${i * 2 + 2}; grid-row-end: ${i * 2 + 3}"></div>`
    var time = 0
    SIZE_CONST = 0.1

    for (var i = 0; i < (l.length - 1); i++) {
        var from = l[i]
        var to = l[i +1]
        console.log(from)
        if (i != 0) {
            if (to[2] == undefined) {
                time = time + (to[3] / MAP_SCALE) * SIZE_CONST * 10 // magic constant, it just works    
            } else {
             
            time = time + (to[2] / MAP_SCALE) * SIZE_CONST * 10 // magic constant, it just works
            }
        }
        console.log(time)
        let times = (Math.floor(time) + "").toHHMMSS()
        if (i != (l.length - 2)) {
            let size = Math.floor((to[2] / MAP_SCALE) * SIZE_CONST * 10)
            if (size < 16) { // Min size
                size = 16 
            }
            fracs.push(size)
            fracs.push(size)
        } else {
            let size = 16

            fracs.push(size)
            fracs.push(size)
        }
        if (i == 0) {
            s += `<div class="background-path-line ${from[1]}" style="background-color: ${lineAttrs[to[1]].stroke};grid-column-start: 1; grid-column-end: 2; grid-row-start: ${i * 2 + 1}; grid-row-end: ${i * 2 + 3}"></div>`

        } else {
            s += `<div class="background-path-line ${from[1]}" style="background-color: ${lineAttrs[to[1]].stroke};grid-column-start: 1; grid-column-end: 2; grid-row-start: ${i * 2 + 0}; grid-row-end: ${i * 2 + 2}"></div>`
        }
        s += `<div class="path-item" style="grid-column-start: 2; grid-column-end: 3; grid-row-start: ${i * 2 + 1}; grid-row-end: ${i * 2 + 3}">${to[0]}: ${times}</div>`
        
    }

    document.getElementById("result").innerHTML = s
    console.log(fracs.join('px ') + "px")
    document.getElementById("result").style.gridTemplateRows = fracs.join('px ') + "px"
    l.splice(0, 0, from)
    for (var i = 0; i < (l.length - 1); i++) {
        Object.keys(lineSeries).forEach(function(k) {
            lineSeries[k].mapLines.each(function (item) {
                if ((item.route[0].tooltipText == l[i] && item.route[1].tooltipText == l[i + 1]) || (item.route[1].tooltipText == l[i] && item.route[0].tooltipText == l[i + 1])) {
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
  document.getElementById("show-buttons").style.display = "none";

}

function control_close() {
  document.getElementById("control-panel").style.display = "none";
  document.getElementById("show-buttons").style.display = "block";

  document.body.style.gridTemplateColumns = "2fr 0fr"
}

function legend_open() {
  document.getElementById("legend-panel").style.display = "block";
  document.getElementById("show-buttons").style.display = "none";

}

function legend_close() {
  document.getElementById("legend-panel").style.display = "none";
  document.getElementById("show-buttons").style.display = "block";

  document.body.style.gridTemplateColumns = "2fr 0fr"
}
function addroad_open() {
  document.getElementById("addroad-panel").style.display = "block";
  document.getElementById("show-buttons").style.display = "none";

}

function addroad_close() {
  document.getElementById("addroad-panel").style.display = "none";
  document.getElementById("show-buttons").style.display = "block";

  document.body.style.gridTemplateColumns = "2fr 0fr"
}