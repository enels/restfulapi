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
    let parsedUrl = url.parse(req.url, true);

    // get the path


    // send the response

    
    // log the request path

    res.end('Hello, World\n');
});

// start the server and have it listen on port 3000
server.listen(3000, function() {
    console.log("The server is listening on port 3000");
})