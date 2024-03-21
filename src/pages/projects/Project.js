import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import ProjectSidebar from './ProjectSidebar';
import { useParams } from "react-router-dom";
import { Col, Row, Badge, Container, Button } from 'react-bootstrap';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import SpinnerCenter from 'pages/shared/Spinner';

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
    const [project, setProject] = useState(null);
    let { projectId } = useParams();


    useEffect(() => {
        fetch('http://127.0.0.1:8080/projects/' + projectId, reqOptions)
            .then(response => response.json())
            .then(json => setProject(json))
            .catch(error => console.error(error));
    }, []);
    return (
        <>
            <Row className='m-2'>
                <Col xs={12} sm={12} md={4} xl={2}>
                    <ProjectSidebar projectId={projectId} />
                </Col>
                <Col xs={12} sm={12} md={8} xl={10} className='px-5'>
                    {project ? <>
                        <h3 className='mb-4'>#{projectId} {project.theme}</h3>
                        <hr />
                        <div>
                            <Row className='mb-3'>
                                <Col md="auto">
                                    Статус: <Badge pill bg="info" className='mx-2 style-bg'>{project.status}</Badge>
                                </Col>
                                <Col md="auto">
                                    Стадия: <Badge pill bg="info" className='mx-2 style-bg'>{project.stage}</Badge>
                                </Col>
                            </Row>
                            <Row className='mb-3' xs={1} md={2} lg={2}>
                                <Col className='mb-3'>
                                    <div className='fs-3 mb-2 fw-medium'>Студент</div>
                                    <div className='fs-4 mb-2'>{project.student.surname} {project.student.name} {project.student.middlename}, {project.student.cource} курс</div>
                                    <div className='fs-5 mb-2'>Образовательная программа: <span className='fst-italic'>{project.student.education_programme}</span></div>
                                </Col>
                                <Col className='mb-3'>
                                    <Row>
                                        <div className='fs-3 mb-2 fw-medium'>Действия</div>
                                        <div>чипи чипи чапа чапа</div>
                                        <Row sm={1} lg={3}>
                                            <LinkContainer as={Col} to={"./tasks/add"}>
                                                <Button className='style-button mb-3'>Назначить задание</Button>
                                            </LinkContainer>
                                        </Row>
                                        <Row sm={1} lg={3}>
                                            {project.cloud_folder_link === "" ?
                                                <Button variant="outline-warning" className='mb-3' disabled>Проекта нет в облачном хранилище</Button>
                                                : <Button as="a" href={project.cloud_folder_link} target="_blank" rel="noopener noreferrer" className='style-button mb-3'>Открыть папку проекта</Button>
                                            }
                                        </Row>
                                        {/* <Row sm={1} lg={3}>
                                            <LinkContainer as={Col} to={"/"}>
                                                <Button className='style-button mb-3'>Открыть папку проекта</Button>
                                            </LinkContainer>
                                        </Row> */}
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    </> : SpinnerCenter()}
                </Col>
            </Row>
        </>
    );
};

export default Project;