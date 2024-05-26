import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import ProjectSidebar from './ProjectSidebar';
import { useParams } from "react-router-dom";
import { Col, Row, Badge, Container, Button, Table } from 'react-bootstrap';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import SpinnerCenter from 'pages/shared/Spinner';
import { FormatDate } from 'pages/shared/FormatDates';

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

function ProjectStats() {
    const [stats, setStats] = useState(null);
    let { projectId } = useParams();


    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_ADDR}/api/v1/projects/${projectId}/statistics`, reqOptions)
            .then(response => response.json())
            .then(json => setStats(json))
            .catch(error => console.error(error));
    }, []);

    function RenderSupervisorReview() {
        return <>
            {stats.grades.supervisor_review ?
                <>
                    <div className='fs-5 mb-2'>Отзыв научного руководителя (создан {FormatDate(stats.grades.supervisor_review.created)})</div>
                    {stats.grades.supervisor_review.criterias ?
                        <div>
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        <th>Критерий</th>
                                        <th>Оценка</th>
                                        <th>Вес оценки</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.grades.supervisor_review.criterias.map((criteria) =>
                                        <tr>
                                            <td>{criteria.criteria}</td>
                                            <td>{criteria.grade ? criteria.grade : "не выставлена"}</td>
                                            <td>{criteria.weight}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </div>
                        : <div className='fs-5 mb-2'>Критерии оценивания отсутствуют</div>
                    }
                </>
                : <div className='fs-5 mb-2'>Отсутствуют</div>
            }
        </>
    }

    return (
        <>
            <Row className='m-2'>
                <Col xs={12} sm={12} md={4} lg={2}>
                    <ProjectSidebar projectId={projectId} />
                </Col>
                <Col xs={12} sm={12} md={8} lg={10} className='px-5'>
                    {stats ? <>
                        <h3 className='mb-4'>#{projectId} Статистика</h3>
                        <hr />
                        <div>
                            <Row className='mb-3' xs={1} md={2} lg={2}>
                                <Col className='mb-3'>
                                    <div className='fs-3 mb-2 fw-medium'>Встречи</div>
                                    <div className='fs-5 mb-2'>Проведенные встречи: {stats.total_meetings}</div>
                                    <div className='fs-3 mb-2 fw-medium'>Задания</div>
                                    {stats.total_tasks == 0 ?
                                        <div className='fs-5 mb-2'>Заданий нет!</div> :
                                        <>
                                            <div className='fs-5 mb-2'>Всего заданий: {stats.total_tasks}</div>
                                            <div className='fs-5 mb-2'>Выполнено заданий: {stats.tasks_done} ({stats.tasks_done_percent}%)</div>
                                        </>
                                    }
                                </Col>
                                <Col className='mb-3'>
                                    <Row>
                                        <div className='fs-3 mb-2 fw-medium'>Оценки</div>
                                       <div className='fs-4 mb-2 fw-medium'>За защиту: <span className='fs-5 mb-2 fw-normal'>{stats.grades.defence_grade ? stats.grades.defence_grade : "отсутствует"}</span></div> 
                                        <div className='fs-4 mb-2 fw-medium'>Научного руководителя:</div>
                                        {RenderSupervisorReview()}
                                        <Row sm={1} lg={1} xl={2}>
                                            <LinkContainer as={Col} to={""}>
                                                <Button className='style-button mb-3'>Составить отзыв руководителя</Button>
                                            </LinkContainer>
                                        </Row>
                                        <Row sm={1} lg={1} xl={2}>
                                            <LinkContainer as={Col} to={""}>
                                                <Button className='style-button mb-3'>Выставить оценку за защиту</Button>
                                            </LinkContainer>
                                        </Row>
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

export default ProjectStats;