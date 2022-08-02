import * as net from "net";
import {Transform} from "stream";
import chalk from "chalk";

const clients = [];
let chatHistory = [];
// Vivesti kojnomu novomu userovi history
/*function prepareMessageToOutput() {
    return new Transform({
        transform(chunk, encoding, callback) {
            const changedMessage = nickname + ': ' + chunk.toString();
            callback(null, changedMessage);
        }
    });
}*/

const server = net.createServer(function (socket) {
    socket.write(chalk.blue('Connected server\r\n'));
    chatHistory.forEach(user => {
        socket.write(chalk.green(user.nickname) + ": " + user.message +"\n");
    })

    socket.write(chalk.blue('Set your nickname: '));

    const port = socket.remotePort;
    console.log('Client IP. Port: ', socket.remoteAddress);
    console.log("Client connected. Port: ", port);

    let nickname = null;

    socket.on('close', () => {
        let index = clients.indexOf(socket);
        clients.splice(index, 1);
        console.log(`Closed ${port}`);
    });

    clients.push(socket);

    socket.on('data', (message) => {
        message = message.toString().trim();
        if (nickname === null) {
            nickname = message;
        } else {
            chatHistory.push({nickname, message});
            clients.forEach(client => {
                if (client !== socket) {
                    client.write(chalk.red(nickname) + ": " + message+'\n');
                    console.log(chatHistory);
                }
            })
        }
    });

    socket.pipe(process.stdout)
});

server.listen(1337, '127.0.0.1', () => {
    console.log('Listening on ', server.address())
});
