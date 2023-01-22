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
            let newActiveSessionCell = newRow.insertCell();
            let addRouteId = document.createTextNode(route_id);
            newIdCell.appendChild(addRouteId);
            let addRouteName = document.createTextNode(route_name);
            newNameCell.appendChild(addRouteName);

            let addActiveSession = document.createElement('a');

            if (active_session == null) {
                addActiveSession.innerHTML = "アクティブなセッションはありません";
            } else {
            addActiveSession.innerHTML = active_session;
            addActiveSession.href = ("http://localhost:5500/route-overview.html?hoge=" + active_session);
            }
            newActiveSessionCell.appendChild(addActiveSession)
 //発車時刻は余裕あったら実装する
 //TODO: アクティブなセッションがあるか確認する
        }
    });
}

// function checkActiveSession() {
//     const baseUrl = 'http://localhost:8000/route/list';

//     fetch(baseUrl)
//     .then(function (data) {
//         return data.json();
//     })
//     .then(function (json){
//         console.log(json);
//         for (var i = 0; i < json.length; i++) {
//             var active_session = json.routes[i].active_session;
//             if (active_session == null) {
//                 console.log('active session is null');
//             } else {
//                 console.log('active session is not null');
//             }
//         }

//     });
// }