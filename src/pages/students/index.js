import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const reqOptions = {
    method: "GET",
    mode: "cors",
    cache: "default",
    credentials: 'include',
    headers: {
        "Session-Id": cookies.get('session_token')
    }
  };

function Students() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('http://127.0.0.1:8080/students', reqOptions)
            .then(response => response.json())
            .then(json => setData(json))
            .catch(error => console.error(error));
    }, []);
    return (
        <>
            <h1>All students</h1>
            <div>
                {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}
            </div>
        </>
    );
};

  export default Students;