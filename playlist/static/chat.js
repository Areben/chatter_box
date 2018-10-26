// Make Connection
console.log("yup");
const socket = io.connect("http://192.168.1.208:1337");



// Query DOM
const message = document.getElementById("message")
const handle = document.getElementById('handle')
const send = document.getElementById('send')
const output = document.getElementById('output')
const feedback = document.getElementById('feedback')
const whodini = document.getElementById("whodini")
const h2 = document.getElementById("h2")
var emo = document.getElementById('emo')



// Scroll Function
function scrollToBottom() {
    var elmnt = document.getElementById("content");
    elmnt.scrollIntoView(false); // Bottom
}



// Emit events
send.addEventListener('click', function(){
    socket.emit('chat', {
        handle: handle.value,
        message: message.value,
    });
    message.value = "";
});

window.addEventListener("keyup", function(e) {
    if (e.keyCode === 13) {
            socket.emit('chat', {
            handle: handle.value,
            message: message.value,
        });
        message.value = "";
    }
});

message.addEventListener("keypress", function(){
    socket.emit("typing", handle.value);
});

h2.addEventListener("click", function(){
    if (whodini.style.display === "none") {
        whodini.style.display = "block";
    } else {
        whodini.style.display = "none";
    }
})



// Listen For Events
socket.on("chat", function(data) {
    feedback.innerHTML = "";
    output.innerHTML +=
        "<p>" +
        "<strong>" +
        data.handle +
        ": </strong>" +
        data.message +
        "</p>";
        scrollToBottom();
});

socket.on("typing", function(data) {
    feedback.innerHTML =
        "<p><em>" +
        data +
        " is typing a message..." +
        "</em></p>";
        scrollToBottom();
});


$.getJSON('http://gd.geobytes.com/GetCityDetails?callback=?', function(data) {
  console.log(JSON.stringify(data, null, 2));
});
