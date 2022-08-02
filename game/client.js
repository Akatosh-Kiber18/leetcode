import * as net from "net";

const client = new net.Socket();

const interactive = process.argv[2] === '-i'

client.connect(1337, '127.0.0.1', () => {
    console.log('> Connected with port ', client.localPort);
    client.write('Hello, server! Love, Client.\n');
    if (interactive) {
        process.stdin.pipe(client);
    } else {
        client.end();
    }
});

client.on('data', data => {
    console.log(data.toString());
});

client.on('close', () => {
    console.log('> Connection closed');
});