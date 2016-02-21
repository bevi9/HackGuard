/**
 * Created by Juan on 21/02/2016.
 */

var HEARTBEAT_URL = "http://hackupc.ddns.net:8080/ping";
var START_URL = "http://hackupc.ddns.net:8080/mon";
var monitor = false;

function sendHeartBeat(sequence_id) {
    var user = $("#username").val();
    var data = {
        user: user,
        id: sequence_id
    };
    $.ajax({
        type: "POST",
        url: HEARTBEAT_URL,
        data: data,
        success: success,
        dataType: dataType
    });
}

function initGuard() {
    var user = $("#username").val();
    var data = {
        user: user
    };
    $.ajax({
        type: "POST",
        url: START_URL,
        data: data,
        success: success,
        dataType: dataType
    });
}

function dataType() {

}

function success() {
    console.log("hola bebes");
}

function startGuard() {
    initGuard();
    var sequence_id = 0;
    monitor = true;
    while(monitor == true) {
        setTimeout(function() {
            sendHeartBeat(sequence_id);
        }, 500);
        ++sequence_id;
        if(sequence_id == 10) monitor = false;
    }
}