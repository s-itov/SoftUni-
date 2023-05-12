const http = require('http');
const port = 3000;
const handlers = require('./handlers');

const server = http.createServer((req, res)=>{

    for( let handler of handlers) {
        if (!handler(req, res)) {
            break;
        }
    }
});

server.listen(port, () => console.log(`This server is running on port ${port}`));