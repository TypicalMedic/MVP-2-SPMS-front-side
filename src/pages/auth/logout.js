import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'universal-cookie';
import { Link, useNavigate   } from 'react-router-dom';

const cookies = new Cookies();


function Logout() {
    const history = useNavigate();

    useEffect(() => {
        cookies.remove('session_token');
        history('/', {replace: true});
        window.location.reload();
    }, []);

};

export default Logout;