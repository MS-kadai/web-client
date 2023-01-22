window.addEventListener('load', function() {
    getTargetSession()
    getAllSessionEvents()
    getTargetRouteInfo()
})

var target_session = null;
var target_route_name = null;
var target_route_id = null;
let point_names = [];

function getTargetSession() {
    var params = new URLSearchParams(location.search);
    document.getElementById('query-params').innerHTML = params.get('hoge'); //debug
    target_session = params.get('hoge');
}

function getAllSessionEvents() {
    const baseUrl = 'http://localhost:8000/session/'+target_session;

    fetch(baseUrl)
    .then(function (data) {
        return data.json();
    })
    .then(function (json){
        console.log(json); //debug
        for(var i = 0; i < json.length; i++){
            var event_id = json.result[i].eventId;
            var point_id = json.result[i].point_id;
            var event_timestamp = json.result[i].timestamp;

            let tableRef = document.getElementById('event-list-table');
            let newRow = tableRef.insertRow(-1);
            let newEventIdCell = newRow.insertCell();
            let newPointIdCell = newRow.insertCell();
            let newPointNameCell = newRow.insertCell();
            let newEventTimestampCell = newRow.insertCell();
            let addEventId = document.createTextNode(event_id);
            newEventIdCell.appendChild(addEventId);
            let addPointId = document.createTextNode(point_id);
            newPointIdCell.appendChild(addPointId);
            let addEventTimestamp = document.createTextNode(event_timestamp);
            newEventTimestampCell.appendChild(addEventTimestamp);

        }
    });
}

function getPointName() {
    const baseUrl = 'http://localhost:8000/route/'+target_route_id;

    fetch(baseUrl)
    .then(function (data) {
        return data.json();
    })
    .then(function (json){
        for (var i = 0; i < json.length; i++) {
            var point_name = json.route[i].point_name;
            point_names.push(point_name);

            console.log(point_names)
        }
    });
}

function getTargetRouteInfo() {
    const baseUrl = 'http://localhost:8000/route/list';

    fetch(baseUrl)
    .then(function (data) {
        return data.json();
    })
    .then(function (json){

        target_route_name = json.routes.find((v) => v.active_session == target_session).route_name; //セッションIDから検索してルート名を取得
        target_route_id = json.routes.find((v) => v.active_session == target_session).id; //セッションIDから検索してルートIDを取得
        console.log(target_route_name);

        document.getElementById('route-name').innerHTML = target_route_name;
    });

    getPointName();
}

