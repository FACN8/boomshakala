const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const extentionType = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/js',
    ico: 'image/x-icon',
    png: 'image/png',
    jpg: 'image/jpg',
    json: 'application/json'
}

var publicHandler = (request, response) => {}

var srcHandler = (request, response) => {}

var resHandler = (request, response) => {}

var inputHandler = (request, response) => {}

module.exports = {
    publicHandler,
    srcHandler,
    resHandler,
    inputHandler
}