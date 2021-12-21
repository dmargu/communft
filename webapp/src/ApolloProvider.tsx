import React from 'react';
import App from './App';
import { 
    ApolloClient, 
    InMemoryCache,
    createHttpLink,
    ApolloProvider,
    ApolloLink
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';


const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log('graphQLErrors', graphQLErrors);
  }
  if (networkError) {
    console.log('networkError', networkError);
  }
});

const httpLink = createHttpLink({
    uri: 'http://localhost:5000'
});

const link = ApolloLink.from([errorLink, httpLink]);

const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
});

export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);