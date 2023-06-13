const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser');
const handlebars = require('express-handlebars');
const routes = require('./routes');

const initDatabase = require('./config/databaseInit');
const { authentication } = require('./middlewares/authMiddleware');
const PORT = process.env.LISTEN_PORT;

const app = express();

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));

app.set('view engine', 'hbs');

app.use('/static', express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(authentication);
app.use(routes);

initDatabase() //Change database name
    .then(() => app.listen(PORT, () => console.log(`Server is runnning on port ${PORT}...`)))
    .catch((err) => console.log(err));

