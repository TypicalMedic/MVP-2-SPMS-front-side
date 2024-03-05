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

function Meetings() {
    const [data, setData] = useState(null);
    const [meetingFromTime, setMeetingFromTime] = useState("...")

    useEffect(() => {
        const currentTime = new Date(Date.now());
        fetch('http://127.0.0.1:8080/meetings?' + new URLSearchParams({
            from: currentTime.toISOString(),
        }), reqOptions)
            .then(response => response.json())
            .then(json => setData(json))
            .catch(error => console.error(error));
        setMeetingFromTime(currentTime.toUTCString())
    }, []);
    return (
        <>
            <h1>Meetings from {meetingFromTime}</h1>
            <div>
                {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}
            </div>
        </>
    );
};

export default Meetings;