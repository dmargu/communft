const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

require('dotenv').config({ path: '../../.env' });
const User = require('../../models/User');
const { validateRegisterInput, validateLoginInput } = require('../../utils/validators');

function generateToken(user) {
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, process.env.JWT_SECRET, { expiresIn: '3h' }
    );
}

module.exports = {
    Query: {
        async getUsers() {
            try {
                const users = await User.find();
                return users;
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async login(_, { username, password }) {
            const { errors, valid } = validateLoginInput(username, password);
            const user = await User.findOne({ username });

            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }

            if (!user) {
                errors.general = 'User not found';
                throw new UserInputError('User not found', { errors });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                errors.general = 'Password is incorrect';
                throw new UserInputError('Password is incorrect', { errors });
            }

            const token = generateToken(user);

            // return token
            return {
                ...user._doc,
                id: user._id,
                token
            };
        },
        async registerUser(_, { registerUserInput: { username, email, password, confirmPassword } }) {
            // validate data
            const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword);
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }
            // make sure username and email doesn't already exist
            const usernameTaken = await User.findOne({ username });
            const emailTaken = await User.findOne({ email });

            if (usernameTaken) {
                throw new UserInputError('Username is taken', {
                    errors: {
                         username: 'This username is taken'
                    }
                });
            } else if (emailTaken) {
                throw new UserInputError('Email is taken', {
                    errors: {
                        email: 'This email is taken'
                    }
                });
            }

            // hash password
            hashedPassword = await bcrypt.hash(password, 12);

            // create user
            const newUser = new User({
                username,
                email,
                password: hashedPassword,
                createdAt: new Date().toISOString()
            });
            const res = await newUser.save();
            
            //create an auth token
            const token = generateToken(res);

            // return token
            return {
                ...res._doc,
                id: res._id,
                token
            };
        }
    }
};