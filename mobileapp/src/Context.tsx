import React, { createContext, useReducer } from 'react';
import * as SecureStore from 'expo-secure-store';


interface Action {
    type: string;
    payload?: any;
}

const initialState: any = {
    authToken: null,
    isAppLoading: true
};


const AuthContext = createContext({
    authToken: null,
    isAppLoading: true,
    login: (authToken: string) => {},
    restoreLogin: (authToken: string) => {},
    logout: () => {},
    appLoaded: () => {}
});

function authReducer(state: any, action: Action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                authToken: action.payload,
            };
        case 'LOGOUT':
            return {
                ...state,
                authToken: null,
            };
        case 'APP_LOADED':
            return {
                ...state,
                isAppLoading: false,
            };
        default:
            return state;
        
    }
}

function AuthProvider(props: any) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    async function login(authToken: string) {
        //add the authToken to users local storage
        await SecureStore.setItemAsync('jwtToken', authToken);
        dispatch({
            type: 'LOGIN',
            payload: authToken
        });
    }

    function restoreLogin(authToken: string) {
        //token is already in local storage so just log the user in
        dispatch({
            type: 'LOGIN',
            payload: authToken
        });
    }

    async function logout() {
        //remove the authToken from users local storage
        await SecureStore.deleteItemAsync('jwtToken');
        dispatch({
            type: 'LOGOUT'
        });
    }

    function appLoaded() {
        dispatch({
            type: 'APP_LOADED'
        });
    }

    return (
        <AuthContext.Provider value={{ authToken: state.authToken, isAppLoading: state.isAppLoading, login, restoreLogin, logout, appLoaded }}
        {...props}
        />
    );
}

export { AuthContext, AuthProvider, initialState };