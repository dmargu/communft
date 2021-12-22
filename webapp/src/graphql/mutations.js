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
            email
            username
            createdAt
            token
        }
    }
`;

export const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            id
            email
            username
            createdAt
            token
        }
    }
`;