import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';


const ChatRoomScreen = () => {
    const route = useRoute();
    const chatID = route.params;
    console.log(chatID);
    return (
        <View>
            <Text>ChatRoomScreen</Text>
        </View>
    );
}


export default ChatRoomScreen;