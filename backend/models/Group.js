const { model, Schema } = require('mongoose');

//instead of channels just have a new group the type be different, this way groups can work for DMs, main groups, special event chats, etc.
const groupSchema = new Schema({
    type: String,
    nftProjectName: String,
    region: String, //should region have its own type and this link to the ID? We are going to need to search through a regions location and save the location at some point
    createdAt: String,
    members: [{ 
        userID: String,
        createdAt: String 
    }],
    latestMessage: { //TODO: add a profile pic that's related to the group, not doing it now because I'm not sure how to best store it
        messageID: String,
        messageText: String,
        messageSenderUserID: String,
        createdAt: String
    }
});

module.exports = model('Group', groupSchema);