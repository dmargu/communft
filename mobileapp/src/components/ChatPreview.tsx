import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Avatar, Badge } from 'react-native-elements';
import { useNavigation  } from '@react-navigation/native';

import { colors, fonts, scaledSize, dimensions } from '../constants';

interface ChatPreviewProps {
    readMessage: boolean;
    imgUri: string;
    chatPreviewTitle: string;
    time: string;
    message: string;
    id: number
}

const ChatPreview = (props: ChatPreviewProps) => {
    const { readMessage, imgUri, chatPreviewTitle, time, message, id } = props;
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('ChatRoomScreen', { 
            chatID: id ,
            chatTitle: chatPreviewTitle
        });
    }

    return (
        <Pressable onPress={handlePress}>
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <View style={styles.badgeAvatarContainer}>
                        <Badge
                            badgeStyle={readMessage ? styles.badgeStyleActive : styles.badgeStyleDisabled}
                            containerStyle={styles.badgeContainer}
                        />
                        <Avatar
                            rounded
                            source={{ uri: imgUri }}               
                            size={scaledSize(50)}
                        />
                    </View>
                    <View style={styles.textPreviewContainer}>
                        <Text style={styles.chatPreviewTitle} numberOfLines={1}>{chatPreviewTitle}</Text>
                        <Text style={styles.messagePreview} numberOfLines={2} ellipsizeMode='tail'>{message}</Text>
                    </View>
                </View>
                <Text style={styles.time}>{time}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    leftContainer: {
        flexDirection: 'row',
        flex: 1
    },
    badgeAvatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10
    },
    badgeStyleActive: {
        backgroundColor: colors.primaryBlue,
        borderColor: colors.primaryBlue,
        //width: scaledSize(5),
        //height: scaledSize(5),
        //borderRadius: scaledSize(5/2)
        marginRight: 10
    },
    badgeStyleDisabled: { // make badge invisible
        backgroundColor: colors.neutralOne,
        borderColor: colors.neutralOne,
        marginRight: 10
    },
    badgeContainer: {
        //paddingLeft: 10
    },
    textPreviewContainer: {
        width: '92%'  //this isn't perfect but it's good enough for now
    },
    chatPreviewTitle: {
        color: colors.neutralEight,
        fontFamily: fonts.bodyTwoBold.fontFamily,
        fontSize: fonts.bodyTwoBold.fontSize,
        lineHeight: fonts.bodyTwoBold.lineHeight,
        width: '82%'
    },
    messagePreview: {
        color: colors.neutralFour,
        fontFamily: fonts.captionOne.fontFamily,
        fontSize: fonts.captionOne.fontSize,
        lineHeight: fonts.captionOne.lineHeight,
    },
    time: {
        color: colors.neutralFour,
        fontFamily: fonts.captionTwo.fontFamily,
        fontSize: fonts.captionTwo.fontSize,
        lineHeight: fonts.captionTwo.lineHeight
    }
});

export default ChatPreview;
