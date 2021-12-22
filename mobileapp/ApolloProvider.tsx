import React from 'react';
import { registerRootComponent } from 'expo';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import RootComponent from './App';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:5000', //should change this to a .env variable
  cache: new InMemoryCache()
});

const App = () => (
  <ApolloProvider client={client}>
    <RootComponent />
  </ApolloProvider>
);

registerRootComponent(App);