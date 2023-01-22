window.addEventListener('load', function() {
    getTargetSession()
    getAllSessionEvents()
})

var target_session = null;

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