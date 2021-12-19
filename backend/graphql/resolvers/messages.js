const { AuthenticationError, UserInputError } = require('apollo-server');

const Message = require('../../models/Message');
const Group = require('../../models/Group');
const checkAuth = require('../../utils/checkAuth');

module.exports = {
    Query: {
        async getMessages() {
            try {
                const messages = await Message.find().sort({ createdAt: -1 });
                return messages;
            }
            catch (err) {
                throw new Error(err);
            }
        },
        async getGroupMessages(_, { groupID }) { //TODO: add pagination... is it as simple as .limit(50) or however many messages? How do we get the ones after that (ex. 51-100)?
            try {
                const messages = await Message.find({ groupID }).sort({ createdAt: -1 });
                return messages;
            }
            catch (err) {
                throw new Error(err);
            }
        },
        async getMessage(_, { messageID }) {
            try {
                const message = await Message.findById(messageID);
                return message;
            }
            catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async createMessage(_, { messageText, groupID }, context) {
            const user = checkAuth(context);

            try {
                if (messageText.trim() === '') {
                    throw new UserInputError('Please enter a message', {
                        errors: {
                            message: 'Must provide a message'
                        }
                    });
                }

                //check if the user is in the group, this may be overkill and a waste of resources
                const group = await Group.findById(groupID);
                if (!group.members.some(member => member.userID === user.id)) {
                    throw new AuthenticationError('You are not a member of this group');
                }

                const newMessage = new Message({ // it saves database space by not storing the replyToMessageID field if the message isn't a reply
                    messageText,
                    messageSenderUserID: user.id,
                    createdAt: new Date().toISOString(),
                    reactions: [],
                    groupID
                });
                const message = await newMessage.save();
                //save this message as the latest group message, is way latest message saved the cleanest way to do it?
                group.latestMessage = { //TODO: add picture to latest message when it's implemented
                    messageID: message.id,
                    messageText: message.messageText,
                    messageSenderUserID: message.messageSenderUserID,
                    createdAt: message.createdAt
                }
                await group.save();
    
                return message;
            }
            catch (err) {
                throw new Error(err);
            }
        },
        async createReply(_, { messageText, groupID, replyToMessageID }, context) {
            const user = checkAuth(context);

            try {
                if (messageText.trim() === '') {
                    throw new UserInputError('Please enter a message', {
                        errors: {
                            message: 'Must provide a message'
                        }
                    });
                }
                //make sure the message they are replying to exists
                const replyToMessage = await Message.findById(replyToMessageID);
                if (!replyToMessage) {
                    throw new UserInputError('Message does not exist', {
                        errors: {
                            message: 'Message does not exist'
                        }
                    });
                }

                //make sure the user is not replying to themselves
                if (replyToMessage.messageSenderUserID === user.id) {
                    throw new UserInputError('You cannot reply to yourself', {
                        errors: {
                            message: 'You cannot reply to yourself'
                        }
                    });
                }

                //make sure the message is a reply to the same group, this may be overkill and a waste of resources
                if (replyToMessage.groupID !== groupID) {
                    throw new UserInputError('Message is not in the group you are replying in', {
                        errors: {
                            message: 'Message is not in the group you are replying in'
                        }
                    });
                }

                //check if the user is in the group, this may be overkill and a waste of resources
                const group = await Group.findById(groupID);
                if (!group.members.some(member => member.userID === user.id)) {
                    throw new AuthenticationError('You are not a member of this group');
                }

                const newMessage = new Message({
                    messageText,
                    messageSenderUserID: user.id,
                    createdAt: new Date().toISOString(),
                    groupID,
                    replyToMessageID
                });
                const message = await newMessage.save();
                //save this message as the latest group message
                await Group.findByIdAndUpdate(groupID, { 
                    latestMessage: { //TODO: add picture to latest message when it's implemented
                        messageID: message.id,
                        messageText: message.messageText,
                        messageSenderUserID: message.messageSenderUserID,
                        createdAt: message.createdAt
                    }
                });
    
                return message;
            }
            catch (err) {
                throw new Error(err);
            }
        },
        async deleteMessage(_, { messageID, groupID }, context) {
            const user = checkAuth(context);
            
            try {
                const message = await Message.findById(messageID);
                if (!message) {
                    throw new UserInputError('Message does not exist', {
                        errors: {
                            message: 'Message does not exist'
                        }
                    });
                }
                if (message.messageSenderUserID !== user.id) {
                    throw new AuthenticationError('You are not authorized to delete this message.');
                }
                //check if this is the right group, this may be overkill and a waste of resources
                if (message.groupID !== groupID) {
                    throw new UserInputError('Message is not in the group you are deleting from', {
                        errors: {
                            message: 'Message is not in the group you are deleting from'
                        }
                    });
                }

                await message.delete();
                //change the latest group message if it is the latest group message and make it the message before
                const group = await Group.findById(groupID);
                if (group.latestMessage.messageID === messageID) {
                    const latestMessage = await Message.find({ groupID }).sort({ createdAt: -1 }).limit(1); //this returns an array of one object
                    group.latestMessage = { //TODO: add picture to latest message when it's implemented
                            messageID: latestMessage[0].id,
                            messageText: latestMessage[0].messageText,
                            messageSenderUserID: latestMessage[0].messageSenderUserID,
                            createdAt: latestMessage[0].createdAt
                    }
                    await group.save();
                }
                return 'Message deleted successfully.';
            }
            catch (err) {
                throw new Error(err);
            }
        },
        async createReaction(_, { messageID, reaction }, context) {
            const user = checkAuth(context);

            if (reaction.trim() === '') {
                throw new UserInputError('Missing a reaction', {
                    errors: {
                        message: 'Must provide a reaction type'
                    }
                });
            }

            try {
                const message = await Message.findById(messageID);
                if (!message) {
                    throw new UserInputError('Message does not exist', {
                        errors: {
                            message: 'Message does not exist'
                        }
                    });
                }
                //if the user has already reacted change the reaction to the new reaction, otherwise push the users reaction
                if (message.reactions.some(reaction => reaction.userID === user.id)) {
                    const index = message.reactions.findIndex(reaction => reaction.userID === user.id);

                    message.reactions[index].reaction = reaction;
                    message.reactions[index].createdAt = new Date().toISOString();

                    await message.save();
                    return message;
                }
                else {
                    message.reactions.push({
                        userID: user.id,
                        reaction,
                        createdAt: new Date().toISOString()
                    });
                    await message.save();
                    return message;
                }
            }
            catch (err) {
                throw new Error(err);
            }
        },
        async deleteReaction(_, { messageID }, context) {
            const user = checkAuth(context);

            try {
                const message = await Message.findById(messageID);
                if (!message) {
                    throw new UserInputError('Message does not exist', {
                        errors: {
                            message: 'Message does not exist'
                        }
                    });
                }
                const reactionIndex = message.reactions.findIndex(reaction => reaction.userID === user.id);
                if (reactionIndex === -1) {
                    throw new UserInputError('You have not reacted to this message.', {
                        errors: {
                            message: 'You have not reacted to this message.'
                        }
                    });
                }
                message.reactions.splice(reactionIndex, 1);
                await message.save();
                return message;
            }
            catch (err) {
                throw new Error(err);
            }
        }
    }
};