/**
 * Created by Berta on 20/02/2016.
 */
var express = require('express');
var app = express();

var json = { "users" : [],
             "mon" : []}

app.post('/mon', function (req, res) {
    var obj = JSON.parse(jsonStr);
    obj['mon'].push({"id": req.body});
    json = JSON.stringify(obj);
});


app.post('/login', function (req, res) {
    var obj = JSON.parse(jsonStr);
    obj['users'].push({"id": req.body});
    json = JSON.stringify(obj);
});










