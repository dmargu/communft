const { ApolloServer } = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require("apollo-server-core");
const gql = require('graphql-tag');
const mongoose = require('mongoose');

require('dotenv').config({ path: '.env' });



const typeDefs = gql`
    type Query {
        hello: String
    }
`;

const resolvers = {
    Query: {
        hello: () => 'Hello world!!!!!'
    }
};

const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground(),
      ], 
});

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to database');
        return server.listen({ port: 5000 })
    })
    .then((res)=> {
        console.log(`Server is running on port ${res.url}`);
    })
    .catch(err => console.log(err));
