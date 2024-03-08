import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { Container, Row, Card, Badge, Button } from 'react-bootstrap';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import { Link } from "react-router-dom";

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
    const [projects, setProjects] = useState(null);

    useEffect(() => {
        fetch('http://127.0.0.1:8080/projects', reqOptions)
            .then(response => response.json())
            .then(json => setProjects(json["projects"]))
            .catch(error => console.error(error));
    }, []);
    return (
        <>
            <h1>Projects</h1>
            <div>
                {projects ? projects.map((project) =>
                    <Container>
                        <Card border="info" className="mb-4">
                            <Card.Header>#{project.id} <Badge pill bg="info">{project.status}</Badge> <Badge pill bg="info">{project.stage}</Badge></Card.Header>
                            <Card.Body>
                                <Card.Title className='mb-4'>
                                    <LinkContainer to={"./" + project.id}>
                                        <Link className="link-body-emphasis link-offset-2 link-underline-opacity-0 link-underline-opacity-50-hover">{project.theme}</Link>
                                    </LinkContainer>
                                </Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    {project.year}
                                </Card.Subtitle>
                                <Card.Text>
                                    {project.student_name}, {project.cource} курс
                                </Card.Text>
                                {/* <Button variant="outline-light" >Подробнее...</Button> */}
                            </Card.Body>
                        </Card>
                    </Container>
                ) : 'Loading...'}
            </div>
        </>
    );
};

export default Projects;