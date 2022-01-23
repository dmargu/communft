import React from 'react';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation  } from '@react-navigation/native';

import { colors } from '../constants';
import ChatMessage from '../components/ChatMessage';
import MessageInput from '../components/MessageInput';
import { messageData } from '../dummyData';


const ChatRoomScreen = () => { //TODO: android title is not working right, ios formats the title correctly, android doesn't
    const route = useRoute();
    const navigation = useNavigation();

    const chatID = route.params;

    return (
        <View style={styles.container}>
                <FlatList 
                    data={messageData.reverse()} // inverting it and reversing messageData is buggy when messages stay the same across chats
                    inverted                     // inverts it every time it rerenders (ex. right, backwards, right, backwards)
                    renderItem={({ item }) => {
                        if (item.replyToMessageID) {
                            //find the message that matches replyToMessageID
                            const replyToMessage = messageData.find(message => message.messageID === item.replyToMessageID);
                            if (replyToMessage) {
                                return (
                                    <ChatMessage
                                        imgUri={item.imgUri}
                                        messageSenderUsername={item.messageSenderUsername}
                                        message={item.message}
                                        messageTime={item.messageTime}
                                        reactions={item.reactions}
                                        replyMessageUsername={replyToMessage.messageSenderUsername}
                                        replyMessage={replyToMessage.message}
                                    />
                                );
                            } else { //this logic needs to be sorted out
                                return null;
                            }
                        } else {
                            return (
                                <ChatMessage
                                    imgUri={item.imgUri}
                                    messageSenderUsername={item.messageSenderUsername}
                                    message={item.message}
                                    messageTime={item.messageTime}
                                    reactions={item.reactions}
                                />
                            );
                        }
                    }}
                    keyExtractor={(item, index) => item.messageSenderUsername + index}
                />
            <MessageInput />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.neutralOne,
    }
});


export default ChatRoomScreen;