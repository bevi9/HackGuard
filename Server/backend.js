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

map.set(berta,0);

app.post('/mon', function (req, res) {
    all['mon'].push({"id": req.body.user});
    map.set(req.body.user,0);
});


app.post('/login', function (req, res, next) {
    all['users'].push({"id": req.body.user});
});


var client = new Twitter({
    consumer_key: '	Xw8hvsc5Pa7Eur8PTWIXH1ijB',
    consumer_secret: '	rWP3OhuOYtTVBL8pPdJpByCkoXueOuGvE0I0171sNYoFMoHyyI',
    access_token_key: '386750317-TtaWaRgblS02USBwARnBXyi2yXDXnLiukLpydcDB',
    access_token_secret: '	aj930nRAIjiwf8OOxmg2kZb6UKHgBwQpeZ7uKVExVL0AO'
});


//et passen el tag = user i el id per req.body i mirar que el ultim sigui el ++ del anterior
app.post('/ping', function (req, res, next) {
    if(map.has(req.body.user)) {
        var cnt = map.get(req.body.user) + 1;
        if(cnt == req.body.id) {
            console.log("All right folks");
        }
        else {
            throw new Error("Has estat desconectat");
            client.post('statuses/update', {status: "Remember remember the fifth of november"}, function(error, tweet, response){
                if(error) throw error;
                console.log(tweet);  // Tweet body.
                console.log(response);  // Raw response object.
            });
        }
    }
    else throw new Error('No has començat la monitorització ' + req.body.user);

});



app.listen(8080);






