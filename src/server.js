const http = require('http');
const router = require('./router.js');
const server = http.createServer(router);

server.listen(process.env.PORT || 8000, function() {
    console.log('Now listening on port ' + PORT);
});