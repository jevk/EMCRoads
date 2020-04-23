function addLine(from, to, type) {
    var line = lineSeries[type].mapLines.create();
    line.imagesToConnect = [from, to];
    var d = getDistance(from, to) / speedObj[type]
    if (speedObj[type] == -1) {
        d = -1
    }
    line.line.controlPointDistance = 0;
    line.route = [from, to]
    try {
        line.id = to.tooltipText + '^' + from.tooltipText

        from.connections.push([to, d, from, type])
        to.connections.push([from, d, to, type])
        from.connections.sort((el1, el2) => el1[1] > el2[1])
        to.connections.sort((el1, el2) => el1[1] > el2[1])
    } catch (err) {
        console.log(err)
        return false;
    }
    return lineSeries[type].mapLines.length - 1;
}
function getDistance(from, to) {
    // Since all routes are square bc minecraft is square, we can just substract
    return Math.abs((from.latitude - to.latitude) + (from.longitude - to.longitude))

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
        if (!containsObject(conn[0].tooltipText, Object.keys(traversed))) {
            console.log(conn[0].tooltipText)
            traversed[conn[0].tooltipText] = distanceToThat
            cameFrom[conn[0].tooltipText] = [conn[2].tooltipText, conn[3], conn[4], distanceToThat]
            if (to == conn[0]) {
                break;
            }


            if (minDistance > distanceToThat & 0) {

            }
            minDistance = distanceToThat
            path.push([conn[0], conn[3]])
            for (var i = 0; i < conn[0].connections.length; i++) {
                possibleExits.push(
                    [conn[0].connections[i][0],
                    conn[0].connections[i][1] + distanceToThat,
                    conn[0],
                    conn[0].connections[i][3],
                    conn[0].connections[i][1]
                    ],
                )
            }
            path.pop()
        }


        iter++
    }
    if (to == undefined) {
        return undefined
    }
    if (cameFrom[to.tooltipText] == undefined) {
        return undefined;
    }
    var to = [to.tooltipText, cameFrom[to.tooltipText][1], cameFrom[to.tooltipText][2], cameFrom[to.tooltipText][3]]
    var from = [from.tooltipText, "walk", 0, 0]

    window.path_buff = [from]
    var connv = to
    while (true) {
        if (connv == undefined) {
            break
        }
        console.log(connv[3])
        console.log(connv[2])
        window.path_buff.push(connv)
        connv = cameFrom[connv[0]]
        console.log(window.path_buff)
    }
    console.log(window.path_buff)
    if (window.path_buff == false) {
        // no path
        return false;
    }
}
