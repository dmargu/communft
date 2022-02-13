import React, { createContext, useReducer } from 'react';
import * as SecureStore from 'expo-secure-store';


interface Action {
    type: string;
    payload?: any;
}

const initialState: any = {
    authToken: null,
    isAppLoading: true,
    authenticatedUserId: null
};


const AuthContext = createContext({
    authToken: null,
    isAppLoading: true,
    authenticatedUserId: null,
    login: (payload: { token: string, id: string }) => {},
    restoreLogin: (payload: { token: string, id: string }) => {},
    logout: () => {},
    appLoaded: () => {}
});

function authReducer(state: any, action: Action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                authToken: action.payload.token,
                authenticatedUserId: action.payload.id
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

interface LoginPayload {
    token: string;
    id: string;
}

function AuthProvider(props: any) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    async function login(payload: LoginPayload) {
        //add the authToken to users local storage
        await SecureStore.setItemAsync('jwtToken', payload.token);
        dispatch({
            type: 'LOGIN',
            payload
        });
    }

    function restoreLogin(payload: LoginPayload) {
        //token is already in local storage so just log the user in
        dispatch({
            type: 'LOGIN',
            payload
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
        <AuthContext.Provider value={{ authToken: state.authToken, isAppLoading: state.isAppLoading, authenticatedUserId: state.authenticatedUserId, login, restoreLogin, logout, appLoaded }}
        {...props}
        />
    );
}

export { AuthContext, AuthProvider, initialState };