import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { Container, Row, Card, Badge, Button, Col, Spinner } from 'react-bootstrap';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import { Link } from "react-router-dom";
import SpinnerCenter from 'pages/shared/Spinner';

const cookies = new Cookies();

const googleDriveAuth = "http://127.0.0.1:8080/auth/integration/authlink/googledrive";
const returnURL = "http://localhost:3000/";

const reqOptions = {
    method: "GET",
    mode: "cors",
    cache: "default",
    credentials: 'include',
    headers: {
        "Session-Id": cookies.get('session_token')
    }
};

function GoogleDrive() {
    function OpenAuth() {
        fetch(`${googleDriveAuth}?redirect=${returnURL}`, reqOptions)
        .then(response => response.text())
        .then(url => window.open(url, "_blank", "noreferrer,noopener"))
        .catch(error => console.error(error));
    }
    return <>
    {/* дополнительное окно вполне может пригодиться, в частности для выбора корневой папки (правда как это сделать?) ну и мб для другой информации? */}
        <Button as="a" onClick={OpenAuth} className='style-button mb-3'>Авторизоваться в Google Drive (testing)</Button>
    </>
};

export default GoogleDrive;