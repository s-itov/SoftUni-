const url = require('url');
const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const pathname = url.parse(req.url).pathname;

  if (pathname === '/cats/add-breed' && req.method === 'POST') {
    let requestBody = '';

    req.on('data', chunk => {
      requestBody += chunk;
    });

    req.on('end', () => {
      try {
        const breedData = JSON.parse(requestBody);
        const breedName = breedData.breed;

        // Read the breeds.json file
        const breedsPath = path.join(__dirname, '../data/breeds.json');
        fs.readFile(breedsPath, (err, data) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 Internal Server Error');
          } else {
            const breeds = JSON.parse(data);

            // Modify the breeds data
            breeds.push(breedName);

            // Update the breeds.json file
            fs.writeFile(breedsPath, JSON.stringify(breeds), err => {
              if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500 Internal Server Error');
              } else {
                res.writeHead(302, { 'Location': '/' }); // Redirect to the home page
                res.end();
              }
            });
          }
        });
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('400 Bad Request');
      }
    });
  } else {
    return true;
  }
};
