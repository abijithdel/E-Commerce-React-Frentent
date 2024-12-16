import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Outlet, Link } from "react-router-dom";
import './Header.css'

function Header() {
    return (
        <div className='header'>
            <Navbar expand="lg" className="text-white">
                <Container>
                    <Navbar.Brand href="#home" className="text-white title">E-Cart</Navbar.Brand>
                    <Navbar.Toggle className='text-white bg-white' aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">

                            <Nav.Link className="text-white icons">
                                <Link to='signin'>Sign in</Link>
                            </Nav.Link>

                            <Nav.Link className="text-white icons">
                                <Link to='signup'>Sign up</Link>
                            </Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </div>
    );
}

export default Header;