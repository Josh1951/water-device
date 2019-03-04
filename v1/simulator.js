var request = require('request')

var sensorReading = 15;

request({
    url: "https://development-project-jharvey847.c9users.io/telemetry/" + sensorReading,
    method: "GET",
    json: true
    }, function (error, response, body){
        console.log(myJSONObject);
});