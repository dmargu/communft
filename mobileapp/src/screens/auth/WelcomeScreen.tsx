import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Overlay } from 'react-native-elements';
import { useNavigation  } from '@react-navigation/native';


const WelcomeScreen = () => {
    const [OverlayVisible, setOverlayVisible] = useState(false);
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text>Welcome to COMMUNFT</Text>
            <Button title="Login" onPress={() => {
                navigation.navigate('LoginScreen');
            }}/>
            <Button title="Sign Up" onPress={() => {setOverlayVisible(true)}}/>
            <Overlay
                transparent={true}
                isVisible={OverlayVisible}
                onBackdropPress={() => setOverlayVisible(false)}>
                    <View>
                        <Text>Hello World!</Text>
                    </View>
                </Overlay>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
})
export default WelcomeScreen;