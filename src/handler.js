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

//Handles requests for the public directory e.g. images/css/js files
const publicHandler = (request, response) => {
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

//Handles user requests for autocompleting search queries
const inputHandler = (request, response) => {
    const url = request.url;
    const url_parts = urlMod.parse(request.url, true);
    const search = url_parts.query.search.toLowerCase();
    let autocomplete = [];

    //Populating autocomplete list according to search term
    dictionary.keywords.forEach(element => {
        if (element.toLowerCase().includes(search) &&
            element.toLowerCase().indexOf(search.substring(0, 1)) === 0 &&
            autocomplete.length <= 10 &&
            search !== '')
            autocomplete.push(element);
    });

    //Fills up list if sensitive autocomplete not enough
    //e.g. Searching 'horse' would return ['Horse', 'Seahorse']
    let i = 0;

    while (autocomplete.length < 10 &&
        dictionary.keywords[i] != null &&
        search !== '') {
        if (!autocomplete.includes(dictionary.keywords[i]) &&
            dictionary.keywords[i].includes(search)) {
            autocomplete.push(dictionary.keywords[i]);
        }
        i++;
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

//Default home page when user accesses website
const homePageHandler = (request, response) => {
    const url = path.join(__dirname, "..", "public", "index.html");

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