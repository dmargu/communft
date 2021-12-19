const gql = require('graphql-tag');

module.exports = gql` 
    type User {
        id: ID!,
        username: String!,
        password: String!,
        email: String!,
        createdAt: String!,
        token: String!,
        homeRegion: String!,
        lastKnownRegion: String!,
        connectedWallets: [WalletInfo]!,
        groups: [String]!,
        friends: [String]!
    }
    type WalletInfo {
        walletAddress: String!,
        walletProvider: String!
    }
    type Group {
        id: ID!,
        members: [Member]!,
        type: String!,
        createdAt: String!,
        nftProjectName: String,
        region: String,
        latestMessage: LatestMessage,
    }
    type Member {
        userID: String!
        createdAt: String!
    }
    type LatestMessage {
        messageID: String!,
        messageText: String!,
        messageSenderUserID: String!,
        createdAt: String!
    }
    type Message {
        id: ID!,
        groupID: String!,
        messageText: String!,
        messageSenderUserID: String!,
        createdAt: String!,
        reactions: [Reaction]!,
        replyToMessageID: String
    }
    type Reaction {
        userID: String!,
        reaction: String!,
        createdAt: String!
    }
    input RegisterUserInput{
        username: String!,
        password: String!,
        confirmPassword: String!,
        email: String!
    }
    type Query {
        getUsers: [User]
        getMessages: [Message]
        getGroupMessages(groupID: String!): [Message]
        getMessage(messageID: ID!): Message
    }
    type Mutation {
        registerUser(registerUserInput: RegisterUserInput): User!
        login(username: String, password: String!): User!
        createMessage(messageText: String!, groupID: String!): Message!
        createReply(messageText: String!, groupID: String!, replyToMessageID: String!): Message!
        deleteMessage(messageID: ID!, groupID: String!): String!
        createReaction(messageID: ID!, reaction: String!): Message!
        deleteReaction(messageID: ID!): Message!
        addWallet(walletAddress: String!, walletProvider: String!): User!
        deleteWallet(walletAddress: String!): User!
    }
`;
