import * as net from "net";
import chalk from "chalk";
import {dropTheDice} from "./dice.js";
import {clean} from "mocha/lib/utils.js";

const clients = [];
let chatHistory = [];

let gameHistory = [];

const server = net.createServer(function (socket) {
    socket.write(chalk.blue('Connected server\r\n'));
    chatHistory.forEach(user => {
        socket.write(chalk.green(user.nickname) + ": " + user.message + "\n");
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
                    client.write(chalk.red(nickname) + ": " + message + '\n');
                    console.log(chatHistory);

                    if (message.toLowerCase() === "drop") {
                        let res = dropTheDice().toString();
                        client.write(chalk.green(`${nickname} got a ${res}\n`));
                        socket.write(chalk.green(`you got a ${res}\n`));
                        gameHistory.push({nickname, "result": res});

                        if (gameHistory.length === clients.length) {
                            let maxVal = 0;
                            let winner = "";
                            gameHistory.forEach(player => {
                                if (player.result > maxVal) {
                                    maxVal = player.result;
                                    winner = chalk.red(player.nickname);
                                } else if (player.result === maxVal) {
                                    winner = "draw"
                                }
                            })
                            if (winner === "draw") {
                                const logDraw = chalk.green(`Its a draw\n`)
                                socket.write(logDraw);
                                client.write(logDraw);
                            } else {
                                const logWinner = chalk.green(`Winner is ${winner} with result: ${maxVal}\n`)
                                socket.write(logWinner);
                                client.write(logWinner);
                            }
                            gameHistory.splice(0, gameHistory.length);
                        }
                    }
                }
            })
        }
        console.log(gameHistory);
    });
    socket.pipe(process.stdout);
});

server.listen(1337, '127.0.0.1', () => {
    console.log('Listening on ', server.address());
});
