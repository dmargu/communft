const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');

require('dotenv').config({ path: '../.env' });

module.exports = (context) => {
    const authHeader = context.req.headers.authorization;
    if (authHeader) {
        // get the token from the Authorization header
        const token = authHeader.split('Bearer ')[1];
        if (token) {
            try {
                const user = jwt.verify(token, process.env.JWT_SECRET);
                return user;
            } catch (err) {
                throw new AuthenticationError('Your session is invalid or expired. Please try again.');
            }
        }
        throw new Error('Authentication token must be \'Bearer [token]\'');
    }
    throw new Error('Authorization header must be provided');
};