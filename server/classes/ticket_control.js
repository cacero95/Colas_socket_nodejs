const fs = require('fs');

class Ticket {
    // en el constructor recivo el numero del ticket y el escritorio que
    // lo esta atendiendo
    constructor(numero, desktop) {
        this.numero = numero;
        this.desktop = desktop;
    }
}
class Ticket_control {
    constructor() {
        this.ultimo = 0;
        this.tickets = [];
        this.hoy = new Date().getDate();
        let data = require('../data/data.json');
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            // los ultimos4 manejan los 4 tickets que esta viendo el usuario por pantalla
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciar_conteo();
        }
    }
    siguiente() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.ultimos4 = [];
        this.saveOnFile();
        return `Ticket ${this.ultimo}`;
    }
    actual() {
        return `Ticket ${this.ultimo}`;
    }
    getUltimos4() {
        return this.ultimos4;
    }
    reiniciar_conteo() {
            this.ultimo = 0;
            this.tickets = [];
            this.ultimos4 = [];
            this.saveOnFile();
        }
        // recive el numero del escritorio que va atender el ticket
    care_ticket(desktop) {
        if (this.tickets.length === 0) {
            return 'No hay tickets'
        }
        let numeroTicket = this.tickets[0].numero;
        // shifts elimina el primer elemento de un arreglo
        this.tickets.shift();
        let setTicket = new Ticket(numeroTicket, desktop);
        // el unshift agrega un elemento al inicio del arreglo
        this.ultimos4.unshift(setTicket);
        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); // delete the last item on a array
        }
        console.log(this.ultimos4);
        this.saveOnFile();
        return setTicket;
    }
    saveOnFile() {
        let json_data = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };
        let jsonDataString = JSON.stringify(json_data);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
        console.log('data updated')
    }
}
module.exports = {
    Ticket_control
}