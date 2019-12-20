function addLine(from, to, type) {
    var line = lineSeries[type].mapLines.create();
    line.imagesToConnect = [from, to];
    var d = getDistance(from, to) / speedObj[type]
    if (speedObj[type] == -1 )  {
        d = -1
    }
    line.line.controlPointDistance = 0;
    line.route = [from, to]
    line.id = to.tooltipText + '^' + from.tooltipText
    from.connections.push([to, d, from, type])
    to.connections.push([from, d, to, type])
    from.connections.sort((el1, el2) => el1[1] > el2[1])
    to.connections.sort((el1, el2) => el1[1] > el2[1])
    return line;
}
function getDistance(from, to) {
    // Function to get distance between two points
    var dLat = (to.latitude-from.latitude)*Math.PI/180;  
    var dLon = (to.longitude-from.longitude)*Math.PI/180;   
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +  
            Math.cos(from.latitude*Math.PI/180) * Math.cos(to.latitude*Math.PI/180) *   
            Math.sin(dLon/2) * Math.sin(dLon/2);   
    var c = 2 * Math.asin(Math.sqrt(a));   
    
    return c
}

function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }

    return false;
}

function pathfind(from, to) {
    var path = (typeof path !== 'undefined') ? path : [];
    var traversed = (typeof traversed !== 'undefined') ? traversed : {};
    var distanceToThis = (typeof distanceToThis !== 'undefined') ? distanceToThis : 0;

    var minDistance = (typeof minDistance !== 'undefined') ? minDistance : Infinity;
    var maxDistance = (typeof maxDistance !== 'undefined') ? maxDistance : Infinity;
    traversed[from.tooltipText] = distanceToThis
    cameFrom = {}

    possibleExits = from.connections.slice()
    var iter = 0
    while (iter < possibleExits.length) {
        possibleExits = possibleExits.sort((a, b) => a[1] > b[1])
        var conn = possibleExits[iter]

        var distanceToThat = distanceToThis + conn[1]
        if (conn[1] == -1) { // Not traversable
            traversed[conn[0].tooltipText] = 6942
        }
        if (!containsObject(conn[0].tooltipText, Object.keys(traversed)))  {
            console.log(conn[0].tooltipText)
            traversed[conn[0].tooltipText] = distanceToThat
            cameFrom[conn[0].tooltipText] = [conn[2].tooltipText, conn[3], conn[1]]
            if (to == conn[0]) {
                break;
            }


            if (minDistance > distanceToThat & 0) {
                
            }
            minDistance = distanceToThat
            path.push([conn[0], conn[3]])
            for (var i = 0; i < conn[0].connections.length; i++) {
                possibleExits.push([conn[0].connections[i][0], conn[0].connections[i][1] +distanceToThat, conn[0], conn[0].connections[i][3]])
            }
            path.pop()
        }


        iter++
    }
    if (to == undefined) {
        return undefined
    }
    console.log(conn.tooltipText)
    console.log(to.tooltipText, from.tooltipText, conn[0])
    function getPath(conn, i) {
        if (conn == from.tooltipText) {
            return []
        } else if (cameFrom[conn] == undefined) {
            return false;
        } 
        // Else
        l = getPath(cameFrom[conn][0], i + 1)
        if (l !== false) {
            l.push(cameFrom[conn])
        }
        return l
    }
    var r = getPath(to.tooltipText)
    console.log(conn)
    console.log(r)
    if (r == false) {
        // no path
        return false;
    }
    r.push([conn[0].tooltipText, conn[3], conn[1]])
    return r
}
