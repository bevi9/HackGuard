/**
 * Created by Berta on 20/02/2016.
 */
var express = require('express');
var app = express();

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//key = id, value 1r 0
var hashmap = require('hashmap');

var Twitter = require('twitter');

var map = new hashmap();

var maptime = new hashmap();

var mapDead = new hashmap();

var all = { "users" : [],
             "mon" : []}


app.post('/mon', function (req, res) {
    var us = JSON.stringify(req.body.user);
    all['mon'].push({"id": us});
    if(map.has(us)) {
        res.send('Ja estats sent monitoritzat');
    }
    else {
        res.sendStatus(200);
        console.log("okay");
        map.set(us,0);
        maptime.set(us, Date.now());
    }
});

app.post('/ack', function(req, res) {
    var us = JSON.stringify(req.body.user);
    var temps = Date.now() - maptime.get(us);
    if(temps > 2000 || mapDead.has(us)) {
        res.send("Dead");
    }
    else res.send("Alive");

});


app.post('/login', function (req, res, next) {
    var us = JSON.stringify(req.body.user);
    all['users'].push({"id": us});
});

app.post('/stop', function(req, res, next) {
    var us = JSON.stringify(req.body.user);
    map.remove(us);
    maptime.remove(us);
});


var client = new Twitter({
    consumer_key: 'Xw8hvsc5Pa7Eur8PTWIXH1ijB',
    consumer_secret: 'rWP3OhuOYtTVBL8pPdJpByCkoXueOuGvE0I0171sNYoFMoHyyI',
    access_token_key: '386750317-TtaWaRgblS02USBwARnBXyi2yXDXnLiukLpydcDB',
    access_token_secret: 'aj930nRAIjiwf8OOxmg2kZb6UKHgBwQpeZ7uKVExVL0AO'
});


//et passen el tag = user i el id per req.body i mirar que el ultim sigui el ++ del anterior
app.post('/ping', function (req, res, next) {
    var us = JSON.stringify(req.body.user);
    var id = req.body.id;
    if(map.has(us)) {
        var cnt = map.get(us) + 1;
        console.log(cnt);
        console.log(id);
        if (cnt == id) {
            console.log("All right folks");
            map.remove(us);
            map.set(us, cnt);
            maptime.set(us, Date.now());
        }

        else {
            client.post('statuses/update', {status: "Laptop from @" + us + "has been stolen" }, function(error, tweet, response){
                console.log("tweet sent");
            });
            mapDead.set(us, true);
            res.send("Has estat desconectat");
        }
    }
    else res.send('No has començat la monitorització ' + us);

});

app.post('/twit', function (req, res, next) {
    client.post('statuses/update', {status: "Remember remember the fifth of november the gundpowder"}, function(error, tweet, response){
        console.log("tweet sent");
    });
    res.sendStatus(200);
});


app.listen(8080);
