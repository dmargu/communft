const userResolver = require('./users');

module.exports = {
    Query: {
        ...userResolver.Query
    }
};