const http = require('http');

const port = 3000;

const server = http.createServer((req, res) => {
    console.log('Request initiated');
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello from Node.js');
});


server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });