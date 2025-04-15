/**
 * 
 * Request Handlers
 * 
 * 
 * */

// Dependencies


// define the handlers
let handlers = {};

// sample handler
handlers.ping = function (data, callback) {

    callback(200);
};

// not found handler
handlers.notFound = function (data, callback) {

    callback(404);
};


// Export the module
module.exports = handlers;