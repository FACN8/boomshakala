const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const extensionType = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    ico: 'image/x-icon',
    png: 'image/png',
    jpg: 'image/jpg',
    json: 'application/json'
}

var publicHandler = (request, response) => {
    const url = path.join(__dirname, '..', request.url);
    const extension = url.split('.')[1];

    fs.readFile(url, (error, file) => {
        if (error) {
            console.log(error);
            response.writeHead(404, { 'Content-Type': extensionType.html });
            response.end('An Error Occured');
            return;
        }
        response.writeHead(200, { 'Content-Type': extensionType[extension] });
        response.end(file);
    });
}

var resHandler = (request, response) => { }

var inputHandler = (request, response) => { }

var homePageHandler = (request, response) => {
    var url = path.join(__dirname, '..', 'public', 'index.html');

    fs.readFile(url, (error, file) => {
        if (error) {
            response.writeHead(404, { 'Content-Type': extensionType.html });
            response.end('404 File not found');
            return;
        }
        response.writeHead(200, { 'Content-Type': extensionType.html});
        response.end(file);
    });
}

module.exports = {
    publicHandler,
    resHandler,
    inputHandler,
    homePageHandler
}