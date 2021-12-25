var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send("Ok");

});

app.get('/test', function (req, res) {
    res.send({ status: 200, message: "ok" });

});
const d = new Date();
let hour = d.getHours();
let minutes = d.getMinutes();
app.get('/time', function (req, res) {
    res.send({ status: 200, message: hour + ':' + minutes });

});

app.get('/hello/:id', function (req, res) {
    res.send({ status: 200, message: `hello ${req.params.id}` },);

});

app.get('/search', function (req, res) {
    let { s } = req.query;
    if (s) return res.send({ status: 200, message: "ok", data: s });
    res.status(500).json({ status: 500, error: true, message: "you have to provide a search" });
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log(host, port);
});  