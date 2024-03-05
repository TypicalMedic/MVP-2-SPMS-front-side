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

function Commits() {
    const [data, setData] = useState(null);
    let { projectId } = useParams();

    useEffect(() => {
        const currentTime = new Date(Date.now());
        currentTime.setDate(currentTime.getDate()-30)
        console.log(cookies.get('professor_id')); 
        fetch('http://127.0.0.1:8080/projects/' + projectId + "/commits?" + new URLSearchParams({
            from: currentTime.toISOString(),
        }), reqOptions)
            .then(response => response.json())
            .then(json => setData(json))
            .catch(error => console.error(error));
    }, []);
    return (
        <>
            <h1>Project {projectId} commits for last 30 days</h1>
            <div>
                {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}
            </div>
        </>
    );
};

export default Commits;