import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import { colors, fonts } from '../constants';


const sendReaction = (type: string) => {
    console.log(type);
};


//make a helper component that takes in an emoji and returns a touchable emoji that when clicked fires off a helper function
const Reaction = (props: { emoji: string, type: string }) => {
    return (
        <View style={styles.reaction}>
            <TouchableOpacity onPress={() => sendReaction(props.type)}>
                <Text>{props.emoji}</Text>
            </TouchableOpacity>
        </View>
    );
};

const ChatMessageOverlay = () => {
    return (
        <View>
            <View style={styles.reactionsContainer}>
                <Reaction emoji="😂" type="laughing"/>
                <Reaction emoji="😲" type="wow"/>
                <Reaction emoji="😢" type="sad"/>
                <Reaction emoji="❤️" type="heart"/>
                <Reaction emoji="🔥" type="fire"/>
                <Reaction emoji="👍" type="thumbs up"/>
                <Reaction emoji="👎" type="thumbs down"/>
            </View>
            <TouchableOpacity onPress={() => {}}>
                <Text style={styles.reply}>Reply</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    reactionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    reaction: {
        padding: 5,
    },
    reply: {
        color: colors.primaryBlue,
        paddingLeft: 5
    }
});

export default ChatMessageOverlay;