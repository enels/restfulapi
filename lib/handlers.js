/**
 * 
 * Request Handlers
 * 
 * 
 * */

// Dependencies
let _data = require('./data');
let helpers = require('./helpers');

// define the handlers
let handlers = {};

handlers.users = function (data, clalback) {

    let accpetableMethods = ['post', 'get', 'put', 'delete'];

    if (accpetableMethods.indexOf(data.method) > -1) {
        handlers._users[data.method](data, callback);
    }
    else {
        callback(405);
    }
};

// containers for the users sub method
handlers._users = {};

// users post
handlers._users.post = function (data, callback) {

    // check that all required fields are filled out
    let firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;

    // for last name
    // check that all required fields are filled out
    let lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;

    // for phone number
    let phoneNumber = typeof(data.payload.phoneNumber) == 'string' && data.payload.phoneNumber.trim().length == 10 ? data.payload.phoneNumber.trim() : false;

    // for password
    let password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length == 10 ? data.payload.password.trim() : false;


    // for Terms of Service agreement
    let tosAgreement = typeof(data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true ? true : false;


    // check if all the fields are ked in
    if (firstName && lastName && phoneNumber && password && tosAgreement) {
        // make sure that the user name don't already exists
        _data.read('users', phoneNumber, function(error, data) {

            if (error) {
                // hash the password
                let hashedPassword = helpers.hash(password);

                if (hashedPassword) {
                    
                    // create the user object
                let userObject = {
                    'firstName': firstName,
                    'lastName': lastName,
                    'phoneNumber': phoneNumber,
                    'hashedPassword': hashedPassword,
                    'tosAgreement': tosAgreement
                };


                // store the user
                _data.create('users', phoneNumber, userObject, function(error) {
                    
                    if (!error) {
                        callback(200);
                    }
                    else {
                        console.log(error);
                        callback(500, {'Error': 'Could not create the new user'});
                    }
                });
                }
                else {
                    callback(500, {'Error': 'Could not hash the user\'s password'});
                }
            }
            else {
                callback(400, {'Error': 'A user with that phone number already exists'});
            }
        });
    }
    else {
        callback(400,{'Error' : 'Missing requires fields'});
    }

};


handlers._users.get = function (data, callback) {
    
};


handlers._users.put = function (data, callback) {
    
};


handlers._users.delete = function (data, callback) {
    
};

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