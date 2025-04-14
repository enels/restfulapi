/**
 * 
 * Library for storing and editig data
 * 
 */

// dependencies
const fs = require('fs');
const path = require('path');

// container for the module (to be exported)
let lib = {};

// base directory
lib.baseDir = path.join(__dirname, '/../.data/');
// write data in a file
lib.create = function(dir, file, data, callback) {

    // open the file for writing
    fs.open(lib.baseDir+dir+'/'+file+'.json','wx', function(error, fileDescriptor){

            if (!error && fileDescriptor) {
                // convert data to string
                let stringData = JSON.stringify(data);

                // write to file and close it
                fs.writeFile(fileDescriptor,stringData,function(error) {
                    if (!error) {
                        fs.close(fileDescriptor, function(error){
                            if (!error) {
                                callback(false);
                            }
                            else {
                                callback('error closing new file');
                            }
                        });
                    }
                    else {
                        callback('errro writing to new file');
                    }
                });
            }
            else {
                callback('Coult not create a new file, it may already exist');
            }
    });
};

// read data from file
lib.read = function(dir, file, callback) {

    fs.readFile(lib.baseDir+dir+'/'+file+'.json','utf-8', function(error, data) {

        callback(error, data);
    });
};

lib.update = function(dir, file, data, callback) {

    // open the file for wrting
    fs.open(lib.baseDir+dir+'/'+file+'.json', 'r+', function(error, fileDescriptor) {

       if (!error && fileDescriptor) {

            let stringData = JSON.stringify(data);

            fs.truncate(fileDescriptor, function(error) {

                if (!error) {
                    fs.writeFile(fileDescriptor, stringData, function(error) {
                        if (!error) {
                            fs.close(fileDescriptor, function(error) {
                                if (!error) {
                                    callback(false);
                                }
                                else {
                                    callback("There was an error closign the file");
                                }
                            });
                        }
                    });
                }
                else {
                    callback("error truncating file");
                }
            });
            console.log("file updated");
       }     
       else {
        console.log("Could not open the file for updating");
       }
    });
}




// exports the module
module.exports = lib;