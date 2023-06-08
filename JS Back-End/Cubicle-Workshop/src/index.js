const express = require('express');

const initDatabase = require('./config/databaseInit');
const expressConfig = require('./config/expressConfig');
const handlebarsConfig = require('./config/handlebarsConfig');

const authMiddleware = require('./middlewares/authMiddleware');

const routes = require('./routes');

const app = express();

const PORT = 3000;

// Express config
expressConfig(app);

// Handlebars config
handlebarsConfig(app);

//Routes
app.use(routes);

initDatabase()
    .then(() => app.listen(PORT, () => console.log(`Server is runnning on port ${PORT}...`)))
    .catch((err) => console.log(err));