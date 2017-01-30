/**
 * Created by sun on 1/30/17.
 */
var socket = io();
function submitfunction(){
    var from = $('#user').val();
    var message = $('#msg').val();
    if(message != '') {
        socket.emit('chatMessage', from, message);
    }
    $('#msg').val('').focus();
    return false;
}

function notifyTyping() {
    var user = $('#user').val();
    socket.emit('notifyUser', user);
}

socket.on('chatMessage', function(from, message){
    var me = $('#user').val();
    var color = (from == me) ? 'green' : '#6aa0fd';
    var from = (from == me) ? 'Me' : from;
    if(from === 'Me' ) {
        $('#messages').append('<tr><td></td><td align="right"><b style="color:' + color + '">' + from + '</b>: ' + message + '</td></tr>');
    } else {
        $('#messages').append('<tr><td align="left"><b style="color:' + color + '">' + from + '</b>: ' + message + '</td><td></td></tr>');
    }
});

socket.on('notifyUser', function(user){
    var me = $('#user').val();
    if(user != me) {
        $('#notifyUser').text(user + ' is typing ...');
    }
    setTimeout(function(){ $('#notifyUser').text(''); }, 10000);
});

socket.on('userInitialize', function (name) {
    $('#messages').append('<tr> <td align="center" colspan="2"><b style="color: brown">'+ name +'</b> has just joined on chat</td> </tr>');
});

$(document).ready(function(){
    var name = prompt("Please enter your name", "");
    if(name === '' || name === null) {
        alert("Please enter a valid name to start chatting");
        return;
    }
    $('#user').val(name);
    socket.emit('userInitialize', name);
});
