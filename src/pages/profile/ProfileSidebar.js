import { useState } from 'react';
import { Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import { Link } from "react-router-dom";

function ProfileSidebar(props) {
  return (
    <>
      <Row className="bg-body-tertiary d-grid gap-2 mb-4">
        <LinkContainer to={`/profile/${props.accountId}`}>
          <Button className='style-button-outline'>Информация</Button>
        </LinkContainer>
        <LinkContainer to={`/profile/${props.accountId}/settings`}>
          <Button className='style-button-outline'>Настройки</Button>
        </LinkContainer>
        <LinkContainer to={`/profile/${props.accountId}/integrations`}>
          <Button className='style-button-outline'>Интеграции</Button>
        </LinkContainer>
      </Row>
    </>
  );
}

export default ProfileSidebar;