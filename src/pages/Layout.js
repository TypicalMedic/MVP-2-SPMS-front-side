import { Outlet, Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import Container from 'react-bootstrap/Container';

const Layout = () => {
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>SPMS</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <LinkContainer to="/">
                                <Nav.Link>Главная</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/projects">
                                <Nav.Link>Проекты</Nav.Link>
                            </LinkContainer>
                            <NavDropdown title="Встречи" id="basic-nav-dropdown">
                                <NavDropdown.Item>
                                    <LinkContainer to="/meetings">
                                        <div>Расписание</div>
                                    </LinkContainer>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <LinkContainer to="/meetings/arrange">
                                        <div>Назначить</div>
                                    </LinkContainer>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <LinkContainer to="/scientificleadership/add">
                                <Button variant="success">Взять под научное руководство</Button>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
            <Outlet />
        </>
    )
};

export default Layout;