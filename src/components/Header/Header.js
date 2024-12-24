import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect, useContext } from 'react';
import { isLogin } from '../../AppContext'
import './Header.css'

function Header() {
    const navigate = useNavigate()

    const authStatus = useContext(isLogin)
    useEffect(() => {
        if (localStorage.getItem('user')) {
            authStatus.setLogin(true)
        }
    }, [authStatus])

    function logout(){
        localStorage.removeItem('user')
        authStatus.setLogin(false)
        navigate('/')
    }
    return (
        <div className='header'>
            <Navbar expand="lg" className="text-white">
                <Container>
                    <Navbar.Brand href="#home" className="text-white title">E-Cart</Navbar.Brand>
                    <Navbar.Toggle className='text-white bg-white' aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            {authStatus.islogin ?
                                <Nav.Link className="text-white icons">
                                    <Link onClick={logout} className='text-danger' >Logout</Link>
                                </Nav.Link> 
                                :
                                (<>
                                    <Nav.Link className="text-white icons">
                                        <Link to='signin'>Sign in</Link>
                                    </Nav.Link>

                                    <Nav.Link className="text-white icons">
                                        <Link to='signup'>Sign up</Link>
                                    </Nav.Link>
                                </>)
                            }


                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </div>
    );
}

export default Header;

// (<>
//     <Nav.Link className="text-white icons">
//         <Link to='signin'>Sign in</Link>
//     </Nav.Link>

//     <Nav.Link className="text-white icons">
//         <Link to='signup'>Sign up</Link>
//     </Nav.Link>
// </>)