const handler = require('./handler.js');

var router = (request, response) => {
    var url = request.url;

    if (url === '/') {
        handler.homePageHandler(request, response);
    } else if (url.includes('/input/')) {
        handler.inputHandler(request, response);
    } else if (url.includes('/public/')) {
        handler.publicHandler(request, response);
    } else if (url.includes('/res/')) {
        handler.resHandler(request, response);
    } else {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.end('404 Content not found');
    }
}

module.exports = router;