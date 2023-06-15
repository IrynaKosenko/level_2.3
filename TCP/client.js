import net from 'node:net';

const socket = new net.Socket();
const message = 'TCP client/server';
let start = Date.now();

socket.connect(3000);

console.log('Message to server >> ' + message);

socket.on('data', data => {
    console.log('Message from server << ' + data.toString());
    if(data == message){
        console.log('The same message.');
    } else{
        console.log('This is not the same message.');
    }
});
socket.on('connect', () => {
    socket.write(message);
    socket.end();
});
socket.on('end', () => {
    console.log('Client has disconnected');
    console.log(`Total time: ${Date.now() - start} ms`);
});
socket.on('error', (e) => {
    console.log('Error from server: ' + e.message);
});
