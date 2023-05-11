const url = require('url');
const fs = require('fs');
const path = require('path');
const { getContentType } = require('../handlers/static-files')

module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;

    let filePath = '';

    if (pathname === '/' && req.method === 'GET') {
        filePath = path.join(__dirname, '../views/home/index.html');
    } else if (pathname.endsWith('.css') && req.method === 'GET') {
        filePath = path.join(__dirname, '../content/styles/site.css');
    } else if (pathname.endsWith('.ico') && req.method === 'GET') {
        filePath = path.join(__dirname, '../content/images/pawprint.ico');
    } else {
        return true;
    }

    fs.readFile(filePath, (err, data) => {
        try {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 Not Found');
            } else {
                res.writeHead(200, { 'Content-Type': getContentType(filePath) });
                res.end(data);
            }
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 Internal Server Error');
        }
    });
};
