window.addEventListener('load', function() {
    getTargetSession()
})

var target_session = null;

function getTargetSession() {
    var params = new URLSearchParams(location.search);
    document.getElementById('query-params').innerHTML = params.get('hoge'); //debug
}

function getAllSessionEvents() {
    const baseUrl = 'http://localhost:8000/session/'+target_session;

    fetch(baseUrl)
    .then(function (data) {
        return data.json();
    })
    .then(function (json){
        console.log(json); //debug

        

    });
}