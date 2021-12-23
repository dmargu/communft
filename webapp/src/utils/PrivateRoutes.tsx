import React, { useContext } from "react";
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/Auth';


export const AuthRoute = ({ ...routeProps }) => {
    const { user } = useContext(AuthContext);
    
    return user ? <Navigate to='/profile' /> : <Outlet />;
}

export const ProfileRoute = ({ ...routeProps }) => {
    const { user } = useContext(AuthContext);
    
    return user ? <Outlet /> : <Navigate to='/register' />;
}