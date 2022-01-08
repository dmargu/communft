import React from 'react';
import { registerRootComponent } from 'expo';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import RootComponent from './App';

// Initialize Apollo Client
const client = new ApolloClient({ //if ur getting a network error check to see if the IP address is different
  uri: 'http://10.0.0.45:5000', //should change this to a .env variable, also doing the actual IP address makes it work with android
  cache: new InMemoryCache()
});

const App = () => (
  <ApolloProvider client={client}>
    <RootComponent />
  </ApolloProvider>
);

registerRootComponent(App);