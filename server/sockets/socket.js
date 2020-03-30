const { io } = require('../server');
const { Ticket_control } = require('../classes/ticket_control');

const ticket_control = new Ticket_control();
io.on('connection', (client) => {

    client.on("siguienteTicket", (data, callback) => {
        let siguiente = ticket_control.siguiente();
        console.log(siguiente);
        callback(siguiente);
    });
    client.emit('actual', {
        actual: ticket_control.actual(),
        ultimos4: ticket_control.getUltimos4()
    });
    // atender escritorios
    client.on('care_ticket', (data, callback) => {
        if (!data.desktop) {
            return callback({
                err: true,
                message: 'The Desktop is neccesary'
            })
        }
        let care_ticket = ticket_control.care_ticket(data.desktop);
        callback(care_ticket);
        client.broadcast.emit('actual', {
            actual: ticket_control.actual(),
            ultimos4: ticket_control.getUltimos4()
        });
    })
});