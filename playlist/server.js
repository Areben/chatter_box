// Modules
const emojiData = require('emoji-data');
const express = require('express');
const socket = require('socket.io');
const http = require('http');


// App
const app = express()
const server = app.listen(1337, function() {
    console.log("listening to port 1337");
});


// Files
app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get("/", function (request, response){
    var emojis = {
        char: emojiData.chars()
    }
    console.log(emojis.char.length);
    response.render('index', {emoji: emojis});
});


// Sockets
const io = socket(server)

io.on("connection", function(socket) {
    console.log("Socket ID:", socket.id);

    socket.on("chat", function(data){
        console.log("......................................",
            new Date().toLocaleTimeString()
        );
        console.log(data);
        io.emit("chat", data);
    });

    socket.on("typing", function(data) {
        console.log("****************************************");
        console.log(data);
        io.emit("typing", data);
    })

});
