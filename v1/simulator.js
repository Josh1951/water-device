var request = require('request')

function sendReading(number){
    var sensorReading = Math.floor((Math.random() * 10) + 1);
    request({
    url: "https://development-project-jharvey847.c9users.io/telemetry/" + sensorReading,
    method: "GET",
    json: true
    }, function (error, response, body){
        //something
    });
}

setInterval(function(){ 
    sendReading();    
}, 5000);