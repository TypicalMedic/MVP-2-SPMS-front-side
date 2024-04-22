import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const AuthGuard = (props) => {
    const auth = ( cookies.get('session_token') !== undefined ) ? true : null ;

    // If has token, return outlet in other case return navigate to login page

    return auth ? props.Component : <Navigate to="/login" />;
}

export default AuthGuard