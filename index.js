/**
 * Primary file for the API
 * 
 */

// Dependencies
const http = require('http');
const { StringDecoder } = require('string_decoder');
const url = require('url');
const stringDecoder = require('string_decoder').StringDecoder;


// The server should respond to all request with a string
const server = http.createServer(function(req, res) {
    
    // get the url and parse it
    const parsedUrl = url.parse(req.url, true);

    // get the path
    const path = parsedUrl.pathname;

    // trim off any forward slashes from the path name
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // get the query string as an object
    const queryStringObject = parsedUrl.query;

    // get the http request method
    const method = req.method.toLowerCase();

    // get the headers as an object
    const headers = req.headers;

    
    // get the payload, if any
    const decoder = new StringDecoder('utf-8');

    // buffer to store the string
    let buffer = '';
    req.on("data", function(data) {
        buffer += decoder.write(data);
    });

    req.on("end", function() {
        buffer += decoder.end();

        // send the response
       res.end('Hello, World\n');
    
        // log the request path
        //console.log(`Request received on path ${trimmedPath} with method ${method} with  these query string parameter`, queryStringObject);

        console.log(`Request received with these payloads`, buffer);

    });

});

// start the server and have it listen on port 3000
server.listen(3000, function() {
    console.log("The server is listening on port 3000");
})