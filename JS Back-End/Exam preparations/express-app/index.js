const express = require('express');
const initDatabase = require('./config/databaseInit');
const cookieParser = require('cookie-parser');
const { authentication } = require('./middlewares/authMiddleware');

const handlebars = require('express-handlebars');
const routes = require('./routes');

const app = express();

const PORT = 3000; //Check the port required 

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

