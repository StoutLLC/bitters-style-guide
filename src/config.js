var path = require('path');

module.exports = {
    // Root path of server
    root: path.normalize(__dirname + '/../../..'),

    // Server port
    port: process.env.PORT || 3000
};
