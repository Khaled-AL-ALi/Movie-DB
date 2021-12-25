var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send("Ok");

});

app.get('/test', function (req, res) {
    res.send({status:200, message:"ok"});

});
const d = new Date();
let hour = d.getHours();
let minutes = d.getMinutes();
app.get('/time', function (req, res) {
    res.send({status:200, message:hour+':'+minutes});

});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log(host, port);
});  