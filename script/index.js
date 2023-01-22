window.addEventListener('load', function() {
    getServerTime();
    updateRouteList();
})

function getServerTime() {
    const baseUrl = 'http://localhost:8000/meta/time';

    fetch(baseUrl)
    .then(function (data) {
        return data.json();
    })
    .then(function (json){
        console.log(json);
        document.getElementById('server-time').innerHTML = json.date_time;
    })
}

function updateRouteList() {
    const baseUrl = 'http://localhost:8000/route/list';

    fetch(baseUrl)
    .then(function (data) {
        return data.json();
    })
    .then(function (json){
        console.log(json);
        for (var i = 0; i < json.length; i++) {
            var route_name = json.routes[i].route_name;
            var route_id = json.routes[i].id;

            let tableRef = document.getElementById('table-routes');
            let newRow = tableRef.insertRow(-1);
            let newNameCell = newRow.insertCell();
            let newIdCell = newRow.insertCell();
            let addRouteName = document.createTextNode(route_name);
            newNameCell.appendChild(addRouteName);
            let addRouteId = document.createTextNode(route_id);
            newIdCell.appendChild(addRouteId);
        }
    })
}