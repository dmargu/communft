import { gql } from '@apollo/client';


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

export const GET_USER_INFO = gql`
    query {
        getUser{
            id
            username
            connectedWallets{
            walletAddress
            walletProvider
            }
            homeRegion
            lastKnownRegion
            groups
            friends
        }
    }
`;