var socket = io();
var tickets = [$('#lblTicket1'), $('#lblTicket2'), $('#lblTicket3'), $('#lblTicket4')];
var desktops = [$('#lblEscritorio1'), $('#lblEscritorio2'), $('#lblEscritorio3'), $('#lblEscritorio4')];

socket.on('actual', function(actual) {
    for (var i = 0; i < actual.ultimos4.length; i++) {
        tickets[i].text('Ticket ' + actual.ultimos4[i].numero);
        desktops[i].text('Escritorio ' + actual.ultimos4[i].desktop);
    }
})
socket.on("connect", function() {
    console.log('conectado al servidor');
})
socket.on("disconnect", function() {
    console.log("disconnected")
});