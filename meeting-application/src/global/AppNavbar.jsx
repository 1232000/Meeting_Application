import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { logout } from "../services/auth";
import { useSelector } from "react-redux";
import "../all.scss";

const AppNavbar = () => {
    const { email } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const onLogout = () => {
        logout();
        navigate("/");
    };
    return (
        <Navbar bg="light" expand="lg" className="overflow">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    My Meetings
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <div>
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/Calendar">
                                Calendar
                            </Nav.Link>
                            <NavDropdown
                                title="Meeting"
                                id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/FilterMeeting">
                                    Filter/Search Meeting
                                </NavDropdown.Item>

                                <NavDropdown.Item as={Link} to="/AddMeeting">
                                    Add Meeting
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link as={Link} to="/Team">
                                Teams
                            </Nav.Link>
                        </Nav>
                    </div>
                    <div className="marginLeft">
                        <Nav className="ms-auto">
                            <Navbar.Collapse className="justify-content-end">
                                <Navbar.Text>
                                    <span className="align-hello emphasize">
                                        Hello
                                    </span>

                                    <span className="mail-color mail">
                                        {email}
                                    </span>
                                </Navbar.Text>
                                <Nav.Link
                                    as={Link}
                                    to="/"
                                    className="emphasize"
                                    onClick={onLogout}>
                                    Logout
                                </Nav.Link>
                            </Navbar.Collapse>
                        </Nav>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;
