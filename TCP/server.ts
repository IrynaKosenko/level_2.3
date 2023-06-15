import net from 'node:net';
const PORT = 3000;

const server = net.createServer((socket) => {
    socket.on('data', data => {
        console.log('Message from client >> ' + data.toString());
        socket.write(data);
    });
    socket.on('end', () => {
        console.log('Client disconnected at ' + new Date().toLocaleTimeString());
    });
    socket.on('error', (e) => {
        console.log('Error from socket: ' + e.message);
    });
});
server.on('connection', (socket) => {
    console.log('\nStart connection at ' + new Date().toLocaleTimeString());
    console.log('IP: ' + socket.localAddress);
});
server.on('error', (e) => {
    console.log('Error server: ' + e.message)
});
server.listen(PORT, () => {
    console.log(`Listening started on port ${PORT} at ${new Date().toLocaleString()}`);
});
