const { model, Schema } = require('mongoose');

//not sure how to make sub collections, each group id contains channels which contain messages
const messageSchema = new Schema({
    messageText: String,
    messageSenderUserID: String,
    createdAt: String
});

module.exports = model('Message', messageSchema);