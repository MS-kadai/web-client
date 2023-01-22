window.addEventListener('load', function() {
    getServerTime();
    updateRouteList();
})

var route_ids = [];
var route_names = [];
var route_active_session = [];

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
            var active_session = json.routes[i].active_session;

            //配列にいろいろを格納
            route_ids.push(route_id);
            route_names.push(route_name);
            route_active_session.push(active_session);

            let tableRef = document.getElementById('table-routes');
            let newRow = tableRef.insertRow(-1);
            let newIdCell = newRow.insertCell();
            let newNameCell = newRow.insertCell();
            let addRouteId = document.createTextNode(route_id);
            newIdCell.appendChild(addRouteId);
            let addRouteName = document.createTextNode(route_name);
            newNameCell.appendChild(addRouteName);
 //発車時刻は余裕あったら実装する
 //TODO: アクティブなセッションがあるか確認する
        }
    })
}