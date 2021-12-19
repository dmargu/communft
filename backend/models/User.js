const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createdAt: String,
    bio: String,
    homeRegion: String,
    lastKnownRegion: String,
    connectedWallets: [{
        walletProvider: String,
        walletAddress: String
    }],
    groups: [{ 
        groupId: String 
    }],
    friends: [{ 
        userID: String 
    }]
});

module.exports = model('User', userSchema);