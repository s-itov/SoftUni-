const homeHandler = require('./home');
const staticFiles = require('./staticFiles')
const catHandler = require('./cat')
const addBreedHandler = require('./addingBreed')

module.exports = [homeHandler, staticFiles, catHandler, addBreedHandler];