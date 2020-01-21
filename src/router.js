const handler = require('./handler.js');

var router = (request, response) => {
    var url = request.url;

    if (url.includes('/public')) {
        handler.publicHandler();
    } else if (url.includes('/res')) {
        handler.resHandler();
    } else if (url.includes('/src')) {
        handler.srcHandler();
    } else {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.end('404 Content not found');
    }
}

module.exports = router;