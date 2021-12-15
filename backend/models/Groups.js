const { model, Schema } = require('mongoose');

const groupSchema = new Schema({ //need to come back and fix this to reorganize and make it work with channels
    //groupID: ID, //may want to turn this into an interface and then have separate types for DMs and groups
    members: [{ //do we need IDs? And can they be type ID or have to be string? Going to comment them out for now
        userId: String
    }],
    type: String,
    nftProjectName: String,
    region: String,
    latestMessage: {
        type: Schema.Types.ObjectId,
        ref: 'Message'
    },
    createdAt: String
});

module.exports = model('Group', groupSchema);