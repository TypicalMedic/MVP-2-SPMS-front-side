import { useState } from 'react';
import { Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import { Link } from "react-router-dom";

function ProjectSidebar(props) {  
  return (
    <>
      <Row className="bg-body-tertiary d-grid gap-2">
        <LinkContainer style={{ borderRadius: 0 }} to={"/projects/" + props.projectId}>
          <Button variant="outline-success">Информация</Button>
        </LinkContainer>
        <LinkContainer style={{ borderRadius: 0 }} to={"/projects/" + props.projectId + "/tasks"}>
          <Button variant="outline-success">Задания</Button>
        </LinkContainer>
        <LinkContainer style={{ borderRadius: 0 }} to={"/projects/" + props.projectId + "/commits"}>
          <Button variant="outline-success">Коммиты</Button>
        </LinkContainer>
        <LinkContainer style={{ borderRadius: 0 }} to={"/"}>
          <Button variant="outline-success">Статистика</Button>
        </LinkContainer>
      </Row>
    </>
  );
}

export default ProjectSidebar;