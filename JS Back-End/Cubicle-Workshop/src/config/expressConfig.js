const express = require('express');
const path = require('path');
const cookieParser =require('cookie-parser');
const { authentication } = require('../middlewares/authMiddleware');
 
function expressConfig(app) {
    app.use(express.static(path.resolve(__dirname, '../public')));
    app.use(express.urlencoded({ extended: false }));
    //CookieParser /always before routes/
    app.use(cookieParser());
    app.use(authentication);
}

module.exports = expressConfig;