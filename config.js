// create and export configuration vriables


// container for all the environments
let environments = {};

// staging (default) object
environments.staging = {
    'port': 3000,
    'envName': 'staging'
};

// production environments
environments.production = {
    'port': 5000,
    'envName': 'production'
};

// determine which environment should be exported out
let currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// check that the current environment is among those above, if not, default to staging
let environmentToExport = typeof(environments[currentEnvironment]) === 'object' ? environments[currentEnvironment] : environments.staging;

// Export the module
module.exports = environmentToExport;