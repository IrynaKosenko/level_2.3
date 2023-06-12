import { request } from 'http';
import { stringify } from 'querystring';

const post = 'First post with HTTP';
let postData = stringify({
    msg: post
});

var options = {
    hostname: 'localhost',
    port: 3000,
    method: 'POST',
    headers: {
        'Content-Type': 'text/plain',
        'Content-Length': postData.length
    }
};
let start = Date.now();

let req = request(options, (res) => {
    res.setEncoding('utf8');
    
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('close', () => {
        console.log(`Time: ${Date.now() - start} ms`);
        console.log('Data: ' + data);
        if(data == post){
            console.log('The same massage');
        } else{
            console.log('There is not the same massage');
        }
    });
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});
req.write(postData);
req.end();