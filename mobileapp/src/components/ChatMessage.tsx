import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Pressable, Modal } from 'react-native';
import { Avatar } from 'react-native-elements';
import Tooltip from 'react-native-walkthrough-tooltip';

import ChatMessageOverlay from './ChatMessageOverlay';
import { colors, fonts, scaledSize } from '../constants';

interface ChatMessageProps {
    imgUri: string;
    messageSenderUsername: string;
    message: string;
    messageTime: string;
    reactions: {
        username: string,
        reaction: string
    }[];
    replyMessageUsername?: string;
    replyMessage?: string;
}

const ChatMessage = (props: ChatMessageProps) => {
    const [overlayVisible, toggleOverlay] = useState(false);
    const { imgUri, messageSenderUsername, message, messageTime, reactions, replyMessageUsername, replyMessage } = props;

    //helper function to iterate through reactions and return an array of objects with the reaction and number of times it was in the array
    const getReactionCounts = (reactions: ChatMessageProps['reactions']) => {
        const reactionCounts: { reaction: string, count: number }[] = [];
        reactions.forEach(reaction => {
            const reactionCount = reactionCounts.find(count => count.reaction === reaction.reaction);
            if (reactionCount) {
                reactionCount.count++;
            } else {
                reactionCounts.push({ reaction: reaction.reaction, count: 1 });
            }
        });
        return reactionCounts;
    };

    return (
        <Tooltip
            isVisible = {overlayVisible}
            onClose = {() => toggleOverlay(false)}
            showChildInTooltip={false}
            placement="center"
            content={<ChatMessageOverlay />}
            arrowSize={{ width: 0, height: 0 }}
        >
            <TouchableOpacity
            onLongPress={(event: any) => {

                toggleOverlay(true);
            }}
            >
                <View>
                    {replyMessageUsername && 
                        <View style={styles.replyContainer}>
                            <Text style={styles.replyUsername}>{replyMessageUsername}</Text>
                            <Text style={styles.subText} numberOfLines={1} ellipsizeMode={'tail'}>{replyMessage}</Text>
                        </View>
                    }
                    <View style={styles.container}>
                        <View style={styles.leftContainer}>
                            <Avatar
                                rounded
                                source={{ uri: imgUri }}               
                                size={scaledSize(50)}
                            />
                        </View>
                        <View style={styles.rightContainer}>
                            <View style={styles.messageHeader}>
                                <Text style={styles.username}>{messageSenderUsername}</Text>
                                <Text style={styles.subText}>{messageTime}</Text>
                            </View>
                            <Text style={styles.message}>{message}</Text>
                            {reactions.length > 0 &&
                                <View style={styles.allReactionsContainer}>
                                    <FlatList
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        data={getReactionCounts(reactions)}
                                        keyExtractor={(item, index) => item.count + index.toString()}
                                        renderItem={({ item }) =>
                                            <View style={styles.reactionContainer}>
                                                <Text style={styles.reaction}>
                                                    {item.reaction} {item.count}
                                                </Text>
                                            </View>
                                        }
                                    />
                                </View> 
                            }
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Tooltip>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5
    },
    overlayContainer: {
        alignItems: 'center'
    },
    overlay: { 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    leftContainer: {
        paddingLeft: 10,
        marginRight: 10
    },
    rightContainer: {
        marginRight: 21
    },
    replyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: '19%'
    },
    messageHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    replyUsername: {
        color: colors.neutralFive,
        fontFamily: fonts.captionOneBold.fontFamily,
        fontSize: fonts.captionOneBold.fontSize,
        lineHeight: fonts.captionOneBold.lineHeight,
    },
    username: {
        color: colors.primaryBlueVariant,
        fontFamily: fonts.captionOneBold.fontFamily,
        fontSize: fonts.captionOneBold.fontSize,
        lineHeight: fonts.captionOneBold.lineHeight,
    },
    subText: {
        color: colors.neutralFour,
        fontFamily: fonts.captionTwo.fontFamily,
        fontSize: fonts.captionTwo.fontSize,
        lineHeight: fonts.captionTwo.lineHeight,
        marginLeft: 10,
        marginRight: 50
    },
    message: {
        color: colors.neutralEight,
        fontFamily: fonts.captionOne.fontFamily,
        fontSize: fonts.captionOne.fontSize,
        lineHeight: fonts.captionOne.lineHeight,
        marginRight: 50
    },
    allReactionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    reactionContainer: {
        marginRight: 5,
        backgroundColor: colors.neutralThree,
        borderRadius: 10,
    },
    reaction: {
        color: colors.neutralEight,
        paddingHorizontal: 4,
        paddingVertical: 2,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default ChatMessage;