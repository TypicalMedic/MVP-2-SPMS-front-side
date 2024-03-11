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
      <Row className="bg-body-tertiary d-grid gap-2 mb-4">
        <LinkContainer to={"/projects/" + props.projectId}>
          <Button className='style-button'>Информация</Button>
        </LinkContainer>
        <LinkContainer to={"/projects/" + props.projectId + "/tasks"}>
          <Button className='style-button'>Задания</Button>
        </LinkContainer>
        <LinkContainer to={"/projects/" + props.projectId + "/commits"}>
          <Button className='style-button'>Коммиты</Button>
        </LinkContainer>
        <LinkContainer to={"/"}>
          <Button className='style-button'>Статистика</Button>
        </LinkContainer>
      </Row>
    </>
  );
}

export default ProjectSidebar;