import dgram from 'node:dgram';
const client = dgram.createSocket('udp4');
const PORT = 3000;
const start = Date.now();

client.on('error', (err) => {
    console.error(`Client error:\n${err.message}`);
    client.close();
});

client.on('message', (msg, data) => {
    console.log(`Client got << "${msg.toString()}" from ${data.address}:${data.port}`);
    client.close();
});

client.on('listening', () => {
    console.log(`Client listening to ${client.address().address}:${client.address().port}`);
});

const message = Buffer.from('UDP client/server');
client.send(message, PORT, (err) => {
    if (err) {
        console.error('Failed');
        client.close();
    } else {
        console.log('Client sent: ' + message.toString());
    }
});
client.on('close', () => {
    console.log(`Total time: ${Date.now() - start} ms`);
});
