import http from 'http';
import querystring from 'querystring';
import ip from 'ip';

const PORT = 3000;
const server = http.createServer().listen(PORT);

server.on('connection', (socket) => {
  console.log('\nStart session at ' + new Date().toUTCString());
  console.log(socket.localAddress);
  console.log(ip.address());
});

server.on('request', (req, res) => {
  let start = Date.now();
  let body: string;
  if (req.method == 'POST') {
    body = '';
  }
  req.on('data', (d) => {
    body += d;
  });
  req.on('end', () => {
    let post = querystring.parse(body);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(post.msg);
    console.log(`Time: ${Date.now() - start} ms`);
    console.log('closing the session at ' + new Date().toUTCString());
  });

  req.on('error', (e) => { 
    console.log(e.message);
  })
})

console.log('Listening on port ' + PORT);
