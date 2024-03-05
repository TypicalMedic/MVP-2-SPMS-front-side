import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';

import {useParams} from "react-router-dom";

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

function Project() {
    const [data, setData] = useState(null);
    let { projectId } = useParams();


    useEffect(() => {
        console.log(cookies.get('professor_id')); 
        fetch('http://127.0.0.1:8080/projects/' + projectId, reqOptions)
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

export default Project;