const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createdAt: String,
    homeRegion: String,
    lastKnownRegion: String,
    connectedWallets: [{
        walletAddress: String,
        walletProvider: String
    }],
    groups: [{ 
        groupId: String 
    }],
    friends: [{ 
        userID: String 
    }]
});

module.exports = model('User', userSchema);