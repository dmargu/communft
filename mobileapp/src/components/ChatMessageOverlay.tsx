import React from 'react';
import { Text, View, StyleSheet, Modal } from 'react-native';
import { Overlay } from 'react-native-elements';


interface Props {
    overlayVisible: boolean;
    toggleOverlay: () => void;
}

const ChatMessageOverlay = (props: Props) => { //cannot get the overlay not be in the center of the screen
    return (
        <Overlay
            isVisible={props.overlayVisible}
            onBackdropPress={props.toggleOverlay}
            overlayStyle={styles.overlay}
        >
            <View style={styles.container}>
                <Text style={styles.text}>This is the chat message overlay</Text>
            </View>
        </Overlay>
    );
};

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        //top: 0,
    },
    container: {
    },
    text: {}
});

export default ChatMessageOverlay;