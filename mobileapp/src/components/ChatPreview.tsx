import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Avatar, Badge } from 'react-native-elements';
import { useNavigation  } from '@react-navigation/native';

import { colors, fonts, scaledSize, dimensions } from '../constants';

interface ChatPreviewProps {
    readMessage: boolean;
    imgUri: string;
    username: string;
    time: string;
    message: string;
    id: number
}

const ChatPreview = (props: ChatPreviewProps) => {
    const { readMessage, imgUri, username, time, message, id } = props;
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('ChatRoomScreen', { chatID: id });
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
                    <View style={styles.usernameMessageContainer}>
                        <Text style={styles.username}>{username}</Text>
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
        flexDirection: 'row'
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
    usernameMessageContainer: {
    },
    username: {
        color: colors.neutralEight,
        fontFamily: fonts.bodyTwoBold.fontFamily,
        fontSize: fonts.bodyTwoBold.fontSize,
        lineHeight: fonts.bodyTwoBold.lineHeight,
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

/*<ListItem.Swipeable 
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
        source={{ uri: imgUri }}               
        size={scaledSize(50)}
    />
    <ListItem.Content>
        <View style={{ flexDirection: 'row', alignContent: 'space-between', alignItems: 'center' }}>
            <ListItem.Title style={styles.username}>{username}</ListItem.Title>
            <ListItem.Subtitle style={styles.time}>{time}</ListItem.Subtitle>
        </View>
        <Text style={styles.messagePreview} numberOfLines={2} ellipsizeMode='tail'>{message}</Text>
    </ListItem.Content>
</ListItem.Swipeable>*/