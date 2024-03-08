import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import ProjectSidebar from '../ProjectSidebar';
import { Col, Row } from 'react-bootstrap';
import { Container, Card, Badge, Button } from 'react-bootstrap';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";

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

function Tasks () {
  const [tasks, setTasks] = useState(null);
  let { projectId } = useParams();

  useEffect(() => {
    const currentTime = new Date(Date.now());
    currentTime.setDate(currentTime.getDate() - 30)
    fetch('http://127.0.0.1:8080/projects/' + projectId + "/tasks", reqOptions)
      .then(response => response.json())
      .then(json => setTasks(json["tasks"]))
      .catch(error => console.error(error));
  }, []);

  function renderTasks(){
    if (tasks.length == 0) {
      return (
        <Col>
          Заданий нет!
        </Col>
      )
    }
    return tasks.map((task) =>
      <Col>
        <Card border="info" className="mb-4">
          <Card.Header>#{task.id} <Badge pill bg="info">{task.status}</Badge></Card.Header>
          <Card.Body>
            <Card.Title className='mb-3'>
              <LinkContainer to={"./" + task.id}>
                <Link className="link-body-emphasis link-offset-2 link-underline-opacity-0 link-underline-opacity-50-hover">{task.name}</Link>
              </LinkContainer>
            </Card.Title>
            <Card.Subtitle className="mb-2">
              до: {task.deadline}
            </Card.Subtitle>
            <Card.Text className="text-muted">
              {task.description.substring(0, 50)}...
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    )
  }

  return (
    <>
      <Row className='m-2'>
        <Col xs={12} sm={12} md={4} xl={2}>
          <ProjectSidebar projectId={projectId} />
        </Col>
        <Col xs={12} sm={12} md={8} xl={10} className='px-5'>
          <h3>Задания проекта #{projectId}</h3>
          <hr />
          <Row xs={1} sm={1} md={2} xl={4}>
            {
              tasks ? renderTasks() : 'Loading...'}
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Tasks;