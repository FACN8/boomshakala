const fs = require('fs');
const path = require('path');
const querystring = require('querystring');


var publicHandler = (request, response) => {
    const url = request.url;
    const extension = url.split('.')[1];
    const extentionType = {
        html: 'text/html',
        css: 'text/css',
        js: 'application/js',
        ico: 'image/x-icon',
        png: 'image/png',
        jpg: 'image/jpg',
        json: 'application/json'
    }
    const filePath = path.join(__dirname, '..', url)

    fs.readFile(filePath, (error, file) => {
        if (error) {
            console.log(error)
            response.writeHead(500)
            response.end('An Error Occured')
        } else {
            response.writeHead(200, { 'Content-Type': extensionType[extension] })
            response.end(file)
        }
    })
}

var srcHandler = (request, response) => {}

var resHandler = (request, response) => {}

var inputHandler = (request, response) => {}

module.exports = {
    publicHandler,
    srcHandler,
    resHandler,
    inputHandler
}