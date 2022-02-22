import React from 'react';
import { registerRootComponent } from 'expo';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";
import * as SecureStore from 'expo-secure-store';
import RootComponent from './src/App';


const httpLink = new HttpLink({
  uri: 'http://10.0.0.45:5000' //should change this to a .env variable
});

const authLink = setContext(async () => {
  const token = await SecureStore.getItemAsync('jwtToken');
  return {
      headers: {
          Authorization: token ? `Bearer ${token}` : ''
      }
  }
});

// Initialize Apollo Client
const client = new ApolloClient({ //if ur getting a network error check to see if the IP address is different
  link: authLink.concat(httpLink), //should change this to a .env variable, also doing the actual IP address makes it work with android
  cache: new InMemoryCache()  //.env variables don't acutally work with expo in production need to use expo-constant
});

const App = () => (
  <ApolloProvider client={client}>
    <RootComponent />
  </ApolloProvider>
);

registerRootComponent(App);