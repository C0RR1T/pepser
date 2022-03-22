import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import logo from './logo.png';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useQuery } from 'react-query';
import { CategoryApi } from './generated/openapi';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import CreateCategory from './category/CreateCategory';

const Navigation = () => {
    const { data: categories } = useQuery('categories', () =>
        new CategoryApi().getCategories()
    );
    const [showPopUp, setShowPopUp] = useState(false);
    return (
        <>
            <CreateCategory
                show={showPopUp}
                close={() => setShowPopUp(false)}
            />
            <Navbar
                expand={'lg'}
                bg={'green'}
                style={{
                    background: 'darkgreen',
                    color: 'white',
                }}>
                <Container>
                    <Navbar.Brand>
                        <Link to={'/'}>
                            <img
                                src={logo}
                                height={64}
                                alt={'Logo of Pepser'}
                            />
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Brand>Pepser</Navbar.Brand>
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav.Link>
                            <Link
                                to={'/'}
                                style={{
                                    textDecoration: 'none',
                                    color: 'white',
                                }}>
                                Home
                            </Link>
                        </Nav.Link>

                        <NavDropdown
                            title={
                                <span style={{ color: 'white' }}>
                                    Categories
                                </span>
                            }>
                            {categories?.map(category => (
                                <NavDropdown.Item>
                                    <Link
                                        to={`/${category.id}`}
                                        style={{
                                            textDecoration: 'none',
                                            color: 'white',
                                        }}>
                                        {category.name}
                                    </Link>
                                </NavDropdown.Item>
                            ))}
                        </NavDropdown>
                    </Navbar.Collapse>
                    <Nav>
                        <Button onClick={() => setShowPopUp(true)}>
                            Create a Category
                        </Button>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};

export default Navigation;
