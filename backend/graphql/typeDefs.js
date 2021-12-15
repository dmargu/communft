const gql = require('graphql-tag');

module.exports = gql`
type User {
    id: ID!,
    username: String!,
    password: String!,
    region: String,
    createdAt: String!
}
type Query {
    getUsers: [User]
}
`;
