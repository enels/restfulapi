/**
 * Primary file for the API
 * 
 */

// Dependencies
const http = require('http');
const url = require('url');

// The server should respond to all request with a string
const server = http.createServer(function(req, res) {
    
    // get the url and parse it
    const parsedUrl = url.parse(req.url, true);

    // get the path
    const path = parsedUrl.pathname;

    // trim off any forward slashes from the path name
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    // send the response
    res.end('Hello, World\n');
    
    // log the request path

});

// start the server and have it listen on port 3000
server.listen(3000, function() {
    console.log("The server is listening on port 3000");
})