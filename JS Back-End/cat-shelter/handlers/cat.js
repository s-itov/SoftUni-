const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
//const formidable = require('formidable');
const cats = require('../data/cats.json');
const breed = require('../data/breeds.json');
const getContentType = require('./contentType');


module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;

    let filePath = '';

    if (pathname === '/cats/add-cat' && req.method === 'GET') {
        filePath = path.join(__dirname, '../views/addCat.html');
    } else if (pathname === '/cats/add-breed' && req.method === 'GET'){
        filePath = path.join(__dirname, '../views/addBreed.html');
    }
    else {
        return true;
    }

    fs.readFile(filePath, (err, data) => {
        try {
            if (err) {
                res.writeHead(404, { 'Content-Type': getContentType(filePath) });
                res.end('404 Not Found');
            } else {
                res.writeHead(200, { 'Content-Type': getContentType(filePath) });
                res.end(data);
            }
        } catch (error) {
            res.writeHead(500, { 'Content-Type': getContentType(filePath) });
            res.end('500 Internal Server Error');
        }
    });
};