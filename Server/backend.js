/**
 * Created by Berta on 20/02/2016.
 */
var express = require('express');
var app = express();

//key = id, value 1r 0
var hashmap = require('hashmap');

var map = new hashmap();

var all = { "users" : [],
             "mon" : []}

app.post('/mon', function (req, res) {
    all['mon'].push({"id": req.body.user});
    map.set(req.body.user,0);
});


app.post('/login', function (req, res, next) {
    all['users'].push({"id": req.body.user});
});


//et passen el tag = user i el id per req.body i mirar que el ultim sigui el ++ del anterior
app.post('/ping', function (req, res, next) {
    if(map.has(req.body.user)) {
        var cnt = map.get(req.body.user) + 1;
        if(cnt  == req.body.id) {
            console.log("All right folks");
        }
        else {
            throw new Error("Has estat desconectat");
        }
    }
    else throw new Error('No has començat la monitorització ' + req.body.user);

});

app.listen(8080);






