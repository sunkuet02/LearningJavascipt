var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');


app.get('/', function(request, response){
    var express = require('express');
    app.use(express.static(path.join(__dirname)));
    response.sendFile(path.join(__dirname, 'client/', 'index.html'));
});


io.on('connection', function(socket){

    socket.on('chatMessage', function(from, msg){
        io.emit('chatMessage', from, msg);
        console.log("Chatting message from : " + from + " : "  + msg )
    });

    socket.on('notifyUser', function(user){
        io.emit('notifyUser', user);
    });

    socket.on('userInitialize', function (name) {
       io.emit('userInitialize', name);
    });

    socket.on('disconnect', function () {
        console.log('a user disconnected');
    });
});


http.listen(3333, function(){
    console.log('listening on *:3333');
});