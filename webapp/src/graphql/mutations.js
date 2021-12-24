import { gql } from 'graphql-tag';


export const REGISTER_USER = gql`
    mutation registerUser(
        $username: String!,
        $email: String!, 
        $password: String!,
        $confirmPassword: String!
        ) {
        registerUser(registerUserInput: {
            username: $username,
            email: $email,
            password: $password,
            confirmPassword: $confirmPassword
        }) {
            id
            token
        }
    }
`;

export const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            id
            token
        }
    }
`;

export const ADD_WALLET = gql`
    mutation addWallet($walletAddress: String!, $walletProvider: String!) {
        addWallet(walletAddress: $walletAddress, walletProvider: $walletProvider) {
            id
        }
    }
`;

export const DELETE_WALLET = gql`
    mutation deleteWallet($walletAddress: String!) {
        deleteWallet(walletAddress: $walletAddress) {
            id
        }
    }
`;