const path = require('path');

let dbName = 'belotecounter';

module.exports = {
    development: {
        connectionString: `mongodb://localhost:27017/${dbName}`
    },
    production: {
        connectionString:"mongodb://admin:admin@ds219100.mlab.com:19100/belotecounter"
    }
};