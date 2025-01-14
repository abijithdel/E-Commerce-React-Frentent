import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { isLogin, cartCount } from "../../AppContext";
import Axios from '../../config/axios'
import { IoHomeOutline } from "react-icons/io5";
import { FaTachometerAlt } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { VscAccount } from "react-icons/vsc";
import "./Header.css";

function Header() {
    const [admin, setAdmin] = useState(false);
    const navigate = useNavigate();

    const authStatus = useContext(isLogin);
    const Count = useContext(cartCount)
    useEffect(() => {
        if (localStorage.getItem("user")) {
            const userSri = localStorage.getItem("user");
            const User = JSON.parse(userSri);
            setAdmin(User.admin);
            authStatus.setLogin(true);

            const user = localStorage.getItem('user')
            const obj = JSON.parse(user)
            Axios({
              url:`cart-item-count/${obj._id}`,
              method:'GET'
            })
            .then(response => {
                Count.setCount(response.data.count)
            })
            .catch(err => console.log(err))
        }

    }, [authStatus,Count]);

    function logout() {
        navigate("/");
        localStorage.removeItem("user");
        authStatus.setLogin(false);
    }
    return (
        <div className="header">
            <Navbar expand="lg" className="text-white">
                <Container>
                    <Navbar.Brand href="#home" className="text-white title">
                        E-Cart
                    </Navbar.Brand>
                    <Navbar.Toggle
                        className="text-white bg-white"
                        aria-controls="basic-navbar-nav"
                    />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link className="text-white icons">
                                <IoHomeOutline className="m-1" /> <Link to="/">Home</Link>
                            </Nav.Link>
                            {authStatus.islogin ? (
                                <>
                                    {admin ? (
                                        <Nav.Link className="text-white icons">
                                            <FaTachometerAlt className="m-1" /> <Link to="/admin">Admin Panel</Link>
                                        </Nav.Link>
                                    ) : (
                                        ""
                                    )}
                                    <Nav.Link className="text-white icons">
                                        <Link to='/cart'>
                                            <TiShoppingCart className="m-1"/> Cart <span className="cart-number">{Count.Count}</span>
                                        </Link>
                                    </Nav.Link>

                                    <Nav.Link className="text-white icons">
                                        <Link to='/account'>
                                           <VscAccount className="m-1" /> Account 
                                        </Link>
                                    </Nav.Link>

                                    <Nav.Link className="text-white icons">
                                        <Link onClick={logout} className="text-danger">
                                            Logout
                                        </Link>
                                    </Nav.Link>
                                </>
                            ) : (
                                <>
                                    <Nav.Link className="text-white icons">
                                        <Link to="signin">Sign in</Link>
                                    </Nav.Link>

                                    <Nav.Link className="text-white icons">
                                        <Link to="signup">Sign up</Link>
                                    </Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </div>
    );
}

export default Header;
