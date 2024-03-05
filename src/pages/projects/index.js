import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const reqOptions = {
    method: "GET",
    mode: "cors",
    cache: "default",
    credentials: 'include',
    headers: {
        "Professor-Id": cookies.get('professor_id')
    }
  };

function Projects() {
    const [data, setData] = useState(null);

    useEffect(() => {
        console.log(cookies.get('professor_id')); 
        fetch('http://127.0.0.1:8080/projects', reqOptions)
            .then(response => response.json())
            .then(json => setData(json))
            .catch(error => console.error(error));
    }, []);
    return (
        <>
            <h1>Projects</h1>
            <div>
                {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}
            </div>
        </>
    );
};

export default Projects;