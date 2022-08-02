import * as net from "net";
import {Transform} from "stream";

const clients = [];

/*
let chatStory = {
    name : message
};
*/

let nickname = null;

const server = net.createServer(function (socket) {
    socket.write('Connected server\r\n');
    const port = socket.remotePort;
    console.log('Client IP. Port: ', socket.remoteAddress)
    console.log("Client connected. Port: ", port);

    socket.on('close', () => {
        let index = clients.indexOf(socket);
        clients.splice(index, 1);
        console.log(`Closed ${port}`);
    });

    clients.push(socket);
    socket.on('data', (message) => {
        clients.forEach(client => {
            if (client !== socket) {
                client.write(message);
            }
        })
    });

    socket.pipe(process.stdout)
});

server.listen(1337, '127.0.0.1', () => {
    console.log('Listening on ', server.address())
});
