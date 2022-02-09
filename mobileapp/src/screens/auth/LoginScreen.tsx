import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation  } from '@react-navigation/native';
import { useMutation, useQuery } from '@apollo/client';

import { AuthContext } from '../../Context';
import { LOGIN_USER } from '../../graphql/Mutations';


const LoginScreen = () => {
    const navigation = useNavigation();
    const context = useContext(AuthContext);

    const [loginUser, { loading }] = useMutation(LOGIN_USER, { //this isn't working
        variables: {
            username: 'za',
            password: 'Password1!'
        },
        onCompleted: (data: any) => {
            //send user data to context
            context.login(data.login.token);
        },
        onError: (err: any) => {
            console.log(err);
            console.log(err.graphQLErrors[0].extensions.errors);
        }
    });

     //we should eventually validate data on frontend here to reduce work on the backend, keeping it out now for simplicity
     const handleSubmit = () => {
        //send data to backend
        loginUser();
    };

    return (
        <View style={styles.container}>
            <Text>Login to COMMUNFT</Text>
            <Button title="Login" onPress={() => handleSubmit()}>
                {loading ? <ActivityIndicator size="small" color="black" /> : null}
            </Button>
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
export default LoginScreen;