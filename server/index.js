var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


//Middleware
app.use(express.static('client'));

app.get('/hello',function(req,res){
    res.status(200).send("Get");

});

var messages = [{
    id : 1,
    text:' Welcome to El: ConChat',
    nickname:'Bot ConChat'
}];

io.on('connection',function(socket){
    console.log('The client in:'+socket.handshake.address+"has been connected");
    socket.emit('messages',messages);
    socket.on('add-message', function(data){
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
});

server.listen(6677,function(){
    console.log("Server Running in http://localhost:6677");
});