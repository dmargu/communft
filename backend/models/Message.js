const { model, Schema } = require('mongoose');

//store the group id here and pull the most recent x number of messages at a time, that is the most efficient way to do it
//putting all messages in one doc is not good because documents can get too big
const messageSchema = new Schema({
    groupID: String,
    messageText: String,
    messageSenderUserID: String,
    createdAt: String,
    replyToMessageID: String, //if you need more info like username, text, etc. turn this into object and make it an input type in typeDefs
    reactions: [{
        userID: String,
        reaction: String,
        createdAt: String        
    }],
});

module.exports = model('Message', messageSchema);