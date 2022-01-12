import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ListItem, Avatar, Badge, Button } from 'react-native-elements';

import { colors, fonts, scaledSize, dimensions } from '../constants';

interface ChatPreviewProps {
    readMessage: boolean;
    imgSource: string;
    username: string;
    time: string;
    message: string;
}

const ChatPreview = (props: ChatPreviewProps) => {
    const { readMessage, imgSource, username, time, message } = props;
    return (
        <ListItem.Swipeable 
            containerStyle={styles.container}
            leftContent={
                <Button
                  title="Info"
                  icon={{ name: 'info', color: 'white' }}
                  buttonStyle={{ minHeight: '100%' }}
                />
              }
              rightContent={
                <Button
                  title="Delete"
                  icon={{ name: 'delete', color: 'white' }}
                  buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                />
              }
        >
            <Badge
                badgeStyle={readMessage ? styles.badgeStyleActive : styles.badgeStyleDisabled}
                containerStyle={styles.badgeContainer}
            />
            <Avatar
                rounded
                source={require('../../assets/images/punk6529.png')}               
                size={scaledSize(50)}
            />
            <ListItem.Content>
                <View style={{ flexDirection: 'row', alignContent: 'space-between', alignItems: 'center' }}>
                    <ListItem.Title style={styles.username}>{username}</ListItem.Title>
                    <ListItem.Subtitle style={styles.time}>{time}</ListItem.Subtitle>
                </View>
                <Text style={styles.messagePreview} numberOfLines={2} ellipsizeMode='tail'>{message}</Text>
            </ListItem.Content>
        </ListItem.Swipeable>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.neutralOne,
        flex: 1,
        height: scaledSize(90)
    },
    badgeStyleActive: {
        backgroundColor: colors.primaryBlue,
        borderColor: colors.primaryBlue,
        //width: scaledSize(5),
        //height: scaledSize(5),
        //borderRadius: scaledSize(5/2)
    },
    badgeStyleDisabled: { // make badge invisible
        backgroundColor: colors.neutralOne,
        borderColor: colors.neutralOne,
    },
    badgeContainer: {
        //paddingLeft: 10
    },
    username: {
        flex: 1,
        color: colors.neutralEight,
        fontFamily: fonts.bodyTwoBold.fontFamily,
        fontSize: fonts.bodyTwoBold.fontSize,
        lineHeight: fonts.bodyTwoBold.lineHeight
    },
    messagePreview: {
        color: colors.neutralFour,
        fontFamily: fonts.captionOne.fontFamily,
        fontSize: fonts.captionOne.fontSize,
        lineHeight: fonts.captionOne.lineHeight
    },
    time: {
        color: colors.neutralFour,
        fontFamily: fonts.captionTwo.fontFamily,
        fontSize: fonts.captionTwo.fontSize,
        lineHeight: fonts.captionTwo.lineHeight
    }
});

export default ChatPreview;