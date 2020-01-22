const fs = require("fs");
const path = require("path");
const querystring = require("querystring");
const dictionary = require("./dictionary.json");
const urlMod = require("url");

const extensionType = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    ico: "image/x-icon",
    png: "image/png",
    jpg: "image/jpg",
    json: "application/json"
};

var publicHandler = (request, response) => {
    const url = path.join(__dirname, "..", request.url);
    const extension = url.split(".")[1];

    fs.readFile(url, (error, file) => {
        if (error) {
            console.log(error);
            response.writeHead(404, { "Content-Type": extensionType.html });
            response.end("An Error Occured");
            return;
        }
        response.writeHead(200, { "Content-Type": extensionType[extension] });
        response.end(file);
    });
};

var inputHandler = (request, response) => {
    const url = request.url;
    var url_parts = urlMod.parse(request.url, true);
    var search = url_parts.search.split('=')[1].toLowerCase(); //querystring fetch request localhost:/8080/autocomplete?search=gfeigiw
    var autocomplete = [];

    dictionary.keywords.forEach(element => {
        if (element.toLowerCase().includes(search) &&
            element.toLowerCase().indexOf(search.substring(0, 1)) === 0 &&
            autocomplete.length <= 10)
            autocomplete.push(element);
    });

    if (search === "") {
        autocomplete = [];
    }

    try {
        response.writeHead(200, { 'Content-Type': extensionType.json });
        response.end(JSON.stringify(autocomplete));
    } catch (error) {
        console.log(error);
        response.writeHead(500, { 'Content-Type': extensionType.html });
        response.end(error);
    }
};

var homePageHandler = (request, response) => {
    var url = path.join(__dirname, "..", "public", "index.html");

    fs.readFile(url, (error, file) => {
        if (error) {
            response.writeHead(404, { "Content-Type": extensionType.html });
            response.end("404 File not found");
            return;
        }
        response.writeHead(200, { "Content-Type": extensionType.html });
        response.end(file);
    });
};

module.exports = {
    publicHandler,
    inputHandler,
    homePageHandler
};