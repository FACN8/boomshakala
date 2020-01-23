const handler = require('./handler.js');

let router = (request, response) => {
    const url = request.url;

    if (url === '/') {
        handler.homePageHandler(request, response);
    } else if (url.includes('?search=')) {
        handler.inputHandler(request, response);
    } else if (url.includes('/public/')) {
        handler.publicHandler(request, response);
    } else {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.end('404 Content not found');
    }
}

module.exports = router;