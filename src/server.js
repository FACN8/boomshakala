const http = require('http');
const router = require('./router.js');
const server = http.createServer(router);
const port = 8080;

server.listen(port, function() {
    console.log('Now listening on port ' + port);
});

//