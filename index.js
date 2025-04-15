/**
 * Primary file for the API
 * 
 */

// Dependencies
const http = require('http');
const https = require('https');
const { StringDecoder } = require('string_decoder');
const url = require('url');
const stringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');
const fs = require('fs');
const handlers = require('./lib/handlers');
const helpers = require('./lib/helpers');


// instantiate the http server
const httpServer = http.createServer(function(req, res) {
    
    unifiedServer(req,res);
});

// start the server
httpServer.listen(config.httpPort, function() {
    console.log("The server is listening on port "+config.httpPort+" in " +config.envName+ " mode now.");
});


const httpsServerOptions = {
    'key': fs.readFileSync('./https/key.pem'),
    'cert': fs.readFileSync('./https/cert.pem')
};

// instantiate the https server
const httpsServer = https.createServer(function(httpsServerOptions, req, res) {

    unifiedServer(req, res);
});


// start the https server
httpsServer.listen(config.httpsPort, function() {

    console.log("The server is listening on port "+config.httpsPort+" in " +config.envName+ " mode now.");
    
});

// all the server logic for both the http and https
let unifiedServer = function(req, res) {

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

        // choose the handler this request should go to. Choose the handler.notFound if the request url was not found
        const chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

        // construct the data object to send to the handler
        const data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': helpers.parseJsonToObject(buffer)
        };

        // route the request to the handler specified in the router
        chosenHandler(data, function(statusCode, payload) {
            // use the status code called back by the handler, or default it to 200
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

        
            // use the payload calleed back by the handler, or default an empty object
            payload = typeof(payload) == 'object' ? payload : {};

            // convert the payload to a string
            const payloadString = JSON.stringify(payload);

            // return the response
            res.setHeader('Content-Type','application/json');
            res.writeHead(statusCode);
            res.end(payloadString);

            //console.log(`Request received with these payloads`, buffer);
            console.log(`Returning this response ${statusCode}, ${payloadString}`);
            console.log(data['queryStringObject']);
        });


    });

}

const router = {
    'ping': handlers.ping,
    'users': handlers.users
};