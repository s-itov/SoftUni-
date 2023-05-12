const homeHandler = require('./home');
const staticFiles = require('./staticFiles')
const catHandler = require('./cat')

module.exports = [homeHandler, staticFiles, catHandler];