const { AuthenticationError } = require('apollo-server');

const Message = require('../../models/Message');
const checkAuth = require('../../utils/checkAuth')

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
        async createMessage(_, { messageText }, context) {
            const user = checkAuth(context);
            const newMessage = new Message({
                messageText,
                messageSenderUserID: user.id,
                createdAt: new Date().toISOString()
            });
            const message = await newMessage.save();
            return message;
        },
        async deleteMessage(_, { messageID }, context) {
            const user = checkAuth(context);
            
            try {
                const message = await Message.findById(messageID);
                if (message.messageSenderUserID !== user.id) {
                    throw new AuthenticationError('You are not authorized to delete this message.');
                }
                await message.delete();
                return 'Message deleted successfully.';
            }
            catch (err) {
                throw new Error(err);
            }
        }
    }
};