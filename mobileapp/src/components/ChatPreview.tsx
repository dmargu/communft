import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ListItem, Avatar, Badge } from 'react-native-elements';

import { colors, fonts, scaledSize, dimensions } from '../constants';

const ChatPreview = () => {
    const [showBadge, changeBadge] = useState(true);
    return (
        <ListItem.Swipeable containerStyle={styles.container}>
            <Badge
                badgeStyle={showBadge ? styles.badgeStyleActive : styles.badgeStyleDisabled}
                containerStyle={styles.badgeContainer}
            />
            <Avatar
                rounded
                source={require('../../assets/images/punk6529.png')}               
                size={scaledSize(50)}
            />
            <ListItem.Content>
                <View style={{ flexDirection: 'row', alignContent: 'space-between', alignItems: 'center' }}>
                    <ListItem.Title style={styles.username}>gigachad</ListItem.Title>
                    <ListItem.Subtitle style={styles.time}>12:05 PM</ListItem.Subtitle>
                </View>
                <Text style={styles.messagePreview} numberOfLines={2} ellipsizeMode='tail'>
                    here's my message below, you should suck on my cock, my big fat fucking cock you little pussy
                </Text>
            </ListItem.Content>
        </ListItem.Swipeable>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
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
    },
    usernameDateContainer: {
        flexShrink: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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