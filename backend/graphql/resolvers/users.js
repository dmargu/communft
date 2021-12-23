const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

require('dotenv').config({ path: '../../.env' });
const User = require('../../models/User');
const { validateRegisterInput, validateLoginInput } = require('../../utils/validators');
const checkAuth = require('../../utils/checkAuth');

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
        },
        async getUser(_, {}, context) { //TEST THIS
            const user = checkAuth(context);
            console.log('USER', user);
            
            try {
                const userInDb = await User.findById(user.id);
                return userInDb;
            }
            catch (err) {
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
                createdAt: new Date().toISOString(),
                homeRegion: '',
                lastKnownRegion: '',
                connectedWallets: [],
                groups: [],
                friends: []
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
        },
        async addWallet(_, { walletAddress, walletProvider }, context) {
            const user = checkAuth(context);

            try {
                //make sure the wallet address and wallet provider are not empty strings
                if (walletAddress === '' || walletProvider === '') {
                    throw new Error('Wallet address and wallet provider cannot be empty');
                }

                //make sure the wallet address is not already in the database
                const walletInDb = await User.findOne({ 'connectedWallets.walletAddress': walletAddress });
                if (walletInDb) {
                    throw new Error('Wallet address is connected to a different account. If you believe this is a mistake contact us on discord.');
                }

                const userInDb = await User.findById(user.id);

                userInDb.connectedWallets.push({
                    walletAddress,
                    walletProvider
                });
                await userInDb.save();
                return userInDb;
            }
            catch (err) {
                throw new Error(err);
            }
        },
        async deleteWallet(_, { walletAddress }, context) {
            const user = checkAuth(context);

            try {
                if (walletAddress === '') {
                    throw new Error('Wallet address cannot be empty');
                }
                const userInDb = await User.findById(user.id);
                //make sure wallet address is in connectedWallets
                const walletAlreadyConnected = userInDb.connectedWallets.some(wallet => wallet.walletAddress === walletAddress);
                if (!walletAlreadyConnected) {
                    throw new UserInputError('Wallet not connected', {
                        errors: {
                            walletAddress: 'This wallet is not connected'
                        }
                    });
                }
                userInDb.connectedWallets = userInDb.connectedWallets.filter(wallet => wallet.walletAddress !== walletAddress);
                await userInDb.save();
                return userInDb;
            }
            catch (err) {
                throw new Error(err);
            }
        }
    }
};