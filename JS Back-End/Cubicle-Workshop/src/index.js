const express = require('express');
const handlebars = require('express-handlebars');
const expressConfig = require('./config/expressConfig');
const handlebarsConfig = require('./config/handlebarsConfig');
const homeController = require('./controllers/homeController');
const cubeController = require('./controllers/cubeController');

const app = express();

const PORT = 3000;

// Express config
expressConfig(app);

// Handlebars
handlebarsConfig(app);

// Routes
app.use(homeController);
app.use('/cubes', cubeController, homeController);
app.get('*', (req, res) => {
    res.redirect('/404')
})

app.listen(PORT, () => console.log(`Server is runnning on port ${PORT}...`));

