const gql = require('graphql-tag');

// need to make sure all the fields in here are set up the right way so were in the best spot for default data
module.exports = gql` 
type User {
    id: ID!,
    username: String!,
    password: String!,
    email: String!,
    createdAt: String!,
    token: String!
}
type Query {
    getUsers: [User]
}
input RegisterUserInput{
    username: String!,
    password: String!,
    confirmPassword: String!,
    email: String!
}
type Mutation {
    registerUser(registerUserInput: RegisterUserInput): User!
    login(username: String, password: String!): User!
}
`;
