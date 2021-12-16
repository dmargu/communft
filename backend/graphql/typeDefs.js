const gql = require('graphql-tag');

module.exports = gql`
type User {
    id: ID!,
    username: String!,
    password: String!,
    createdAt: String!,
    authToken: String!
}
type Query {
    getUsers: [User]
}
input RegisterUserInput{
    username: String!,
    password: String!,
    email: String!
}
type Mutation {
    registerUser(registerUserInput: RegisterUserInput): User!
}
`;
