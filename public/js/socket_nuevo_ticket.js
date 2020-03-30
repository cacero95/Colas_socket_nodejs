var socket = io();
var label = $('#lblNuevoTicket');
socket.on('actual', function(actual) {
    console.log(actual)
    label.text(actual.actual);
})
socket.on("connect", function() {
    console.log('conectado al servidor');
})
socket.on("disconnect", function() {
    console.log("disconnected")
});
$('button').on('click', function() {
    socket.emit("siguienteTicket", null, function(siguienteTicket) {
        label.text(siguienteTicket);

    })
})