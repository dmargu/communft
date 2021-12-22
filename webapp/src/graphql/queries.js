import { gql } from 'graphql-tag';


export const GET_MESSAGES = gql`
    query {
        getMessages{
            id
            messageText
            messageSenderUserID
            createdAt
            groupID
            reactions{
                userID
                reaction
                createdAt
            }
            replyToMessageID
        }
    }
`;