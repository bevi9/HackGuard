/**
 * Created by Juan on 21/02/2016.
 */

var HEARTBEAT_URL = "http://hackupc.ddns.net:8080/ping";
var START_URL = "http://hackupc.ddns.net:8080/mon";
var monitor = false;
var sequence_id = 1;

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

function dataType() {}

function success() {}

function startGuard() {
    initGuard();
    monitor = true;
    monitorFunc();
}

function monitorFunc() {
    setTimeout(function() {
        sendHeartBeat(sequence_id);
        ++sequence_id;
        monitorFunc();
    }, 1000);
}