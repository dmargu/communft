const userResolver = require('./users');
const messageResolver = require('./messages');

module.exports = {
    Query: {
        ...userResolver.Query,
        ...messageResolver.Query
    },
    Mutation: {
        ...userResolver.Mutation,
        ...messageResolver.Mutation
    }
};