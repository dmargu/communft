import React, { createContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';

interface Action {
    type: string;
    payload?: any;
}

interface UserData {
    id: string;
    email: string;
    username: string;
    createdAt: string;
    token: string;
}

const initialState: any = {
    user: null,
};

if(localStorage.getItem('jwtToken')) {
    //@ts-ignore
    const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));
    //@ts-ignore
    if(decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('jwtToken');
        window.location.href = '/';
    } else {
        initialState.user = decodedToken;
    }

}

const AuthContext = createContext({
    user: null,
    login: (userData: UserData) => {},
    logout: () => {},
});

function authReducer(state: any, action: Action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload,
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
            };
        default:
            return state;
        
    }
}

function AuthProvider(props: any) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    function login(userData: UserData) {
        localStorage.setItem('jwtToken', userData.token);
        dispatch({
            type: 'LOGIN',
            payload: userData
        });
    }

    function logout() {
        localStorage.removeItem('jwtToken');
        dispatch({
            type: 'LOGOUT'
        });
    }

    return (
        <AuthContext.Provider value={{ user: state.user, login, logout }}
        {...props}
        />
    );
}

export { AuthContext, AuthProvider };