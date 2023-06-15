import dgram from 'node:dgram';
const PORT = 3000;
const server = dgram.createSocket('udp4');

server.bind(PORT);

server.on('message', (msg, data) => {
    console.log('\nSession started at ' + new Date().toLocaleTimeString());
    console.log(`Server got >> "${msg.toString()}" from ${data.address}:${data.port}`);

    const response = Buffer.from(msg.toString())

    server.send(response, data.port, data.address, (err) => {
        if (err) {
            console.error('Failed to send response !!')
        } else {
            console.log('Server response: ' + response.toString());
            console.log('Session ended at ' + new Date().toLocaleTimeString());
        }
    })
});
//How to listen when client was closed? 
// server.on('close', () => {
//     console.log('Client disconnected at ' + new Date().toLocaleString());
// });
server.on('listening', () => {
    console.log(`Server started at ${new Date().toLocaleString()} listening ${server.address().address}:${server.address().port}`);
});

server.on('error', (err) => {
    console.error(`server error:\n${err.message}`);
    server.close();
});
