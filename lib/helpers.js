/* Helpers for various taskss */


// Dependencies
let crypto = require('crypto');
let config = require('./../config');


// Containers for all helpers
let helpers = {};

// create a SHA256 hash
helpers.hash = function(str) {
    if (typeof(str) == 'string' && str.length > 0) {
        let hash = crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex');
        return hash;
    }
    else {
        return false;
    }
};



// parse a JSON string to an object in all cases, without throwing
helpers.parseJsonToObject = function(str) {
    try {
        let obj = JSON.parse(str);
        return obj;
    }
    catch (e) {
        return {};
    }
};










// Export the module
module.exports = helpers;