import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'
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
                            <Nav.Link className="text-white icons" href="#home">Home</Nav.Link>
                            <Nav.Link className="text-white icons" href="#link">Link</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;