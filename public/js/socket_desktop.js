var socket = io();
// el URLSeacrhParams se e mandan todas las variables que vienen desde el url
var seacrh_params = new URLSearchParams(window.location.search);
//seacrh_params.has('escritorio') sirve para ver si viene una variable con un nombre determinado
if (!seacrh_params.has('desktop')) {
    window.location = 'index.html';
    throw new Error('El escritorio debe ir en los parametros');
}
var label = $('small');
var label2 = $('span');
console.log(label2);
var desktop = seacrh_params.get('desktop');
$('span').text('Escritorio ' + desktop);

$('button').on('click', function() {
    socket.emit('care_ticket', {
        desktop: desktop
    }, function(resp) {
        if (resp === 'No hay tickets') {
            label.text(resp);
            alert('No hay tickets');
            return;
        }
        label.html('Ticket ' + resp.numero);
        var audio = new Audio('audio/new-ticket.mp3');
        audio.play();
    })
})


socket.on("connect", function() {
    console.log('conectado al servidor');
})
socket.on("disconnect", function() {
    console.log("disconnected")
});