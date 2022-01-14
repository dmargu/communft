import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation  } from '@react-navigation/native';


const ChatRoomScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();

    const chatID = route.params;

    return (
        <View>
            <Text>ChatRoomScreen</Text>
        </View>
    );
}


export default ChatRoomScreen;