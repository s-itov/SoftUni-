const express = require('express');
const handlebars = require('express-handlebars');
const expressConfig = require('./config/expressConfig');
const handlebarsConfig = require('./config/handlebarsConfig');

const app = express();

const PORT = 3000;

// Express config
expressConfig(app);

// Handlebars
handlebarsConfig(app);

// Routes
app.get('/', (req, res) => {
    res.render('index')
});

app.listen(PORT, () => console.log(`Server is runnning on port ${PORT}...`));

