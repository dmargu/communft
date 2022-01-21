import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, StyleSheet, Keyboard } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, fonts, scaledSize } from '../constants';

const MessageInput = () => { //TODO: need to make this animated and look good
    const [keyboardOffset, setKeyboardOffset] = useState(0);
    const onKeyboardShow = (event: any) => setKeyboardOffset(event.endCoordinates.height);
    const onKeyboardHide = () => setKeyboardOffset(0);
    const keyboardDidShowListener = useRef();
    const keyboardDidHideListener = useRef();

    useEffect(() => {
        //@ts-ignore: type 'EmitterSubscription' is not assignable to type 'Undefined'
        keyboardDidShowListener.current = Keyboard.addListener('keyboardWillShow', onKeyboardShow);
        //@ts-ignore: type 'EmitterSubscription' is not assignable to type 'Undefined'
        keyboardDidHideListener.current = Keyboard.addListener('keyboardWillHide', onKeyboardHide);
      
        return () => {
          //@ts-ignore object is possibly undefined
          keyboardDidShowListener.current.remove();
          //@ts-ignore object is possibly undefined
          keyboardDidHideListener.current.remove();
        };
    }, []);
    return (
        <View style={[styles.container, { bottom: keyboardOffset }]}>
            <View style={styles.addButton}>
                <View style={styles.blueIconContainer}>
                    <MaterialIcons name="add" size={scaledSize(25)} color={colors.neutralEight}/>
                </View>
            </View>

            <View style={styles.messageInputContainer}>
                <TextInput 
                    style={styles.messageInput}
                    placeholder="gm..."
                    multiline
                    placeholderTextColor={colors.neutralFour}
                    underlineColorAndroid="transparent"
                />
                <View style={styles.blueIconContainer}>
                    <MaterialCommunityIcons name="send" size={scaledSize(25)} color={colors.neutralEight}/>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 20,
        paddingTop: 10,
        backgroundColor: colors.neutralOne
    },
    addButton: {
        marginLeft: 15,
        marginRight: 10,
    },
    messageInputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: colors.neutralEight,
        borderRadius: 20,
        padding: 5,
        marginRight: 10
    },
    blueIconContainer: {
        backgroundColor: colors.primaryBlue,
        borderRadius: 50,
        height: scaledSize(40),
        width: scaledSize(40),
        justifyContent: 'center',
        alignItems: 'center',
    },
    messageInput: {
        flex: 1,
        color: colors.neutralEight,
        fontSize: fonts.captionOne.fontSize,
        fontFamily: fonts.captionOne.fontFamily,
        lineHeight: fonts.captionOne.lineHeight,
        marginHorizontal: 10
    }
})

export default MessageInput;