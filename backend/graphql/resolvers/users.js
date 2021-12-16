const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

require('dotenv').config({ path: '../../.env' });
const User = require('../../models/User');

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
        async registerUser(_, { registerUserInput: { username, email, password } }) {
            // validate user data
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
            const token = jwt.sign({
                id: res.id,
                email: res.email,
                username: res.username
            }, process.env.JWT_SECRET, { expiresIn: '1h'});

            // return token
            return {
                ...res._doc,
                id: res._id,
                authToken: token
            };
        }
    }
};