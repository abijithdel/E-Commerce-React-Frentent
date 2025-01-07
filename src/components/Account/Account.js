import React, { useEffect, useState } from 'react'
import { Container, Button } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import Axios from '../../config/axios'
import { DOMAIN } from '../../config/domain'
import './Account.css'

function Account() {
    const navigate = useNavigate()
    const [user, setUser] = useState()
    const [item, setItems] = useState([])
    const [message, setMessage] = useState(null)

    useEffect(() => {
        if (localStorage.getItem('user')) {
            const strUser = localStorage.getItem('user')
            const objUser = JSON.parse(strUser)
            setUser(objUser)

            Axios({
                url: `cart-items/${objUser._id}`,
                method: 'GET'
            })
                .then(response => {
                    if (response.data.status) {
                        setItems(response.data.Cart)
                    } else {
                        setMessage(response.data.message)
                    }
                })
                .catch(err => console.log(err))
        } else {
            navigate('/')
        }
    }, [navigate])

    function buy(produc_id){
        navigate(`/order/${user._id}/${produc_id}`)
    }

    return (
        <div className='account'>
            <title>{user?.email}</title>
            <Container>
                <h2 className='text-center mt-2 title-font'>{user?.email}</h2>
                <div className='main'>
                    <div className="menu">
                        <Link to='/cart'>Cart</Link>
                        <Link to='/edit-user'>Edit User</Link>
                        <Link to='/address'>Address</Link>
                        <Link to='/your-orders'>Orders</Link>
                    </div>
                    <div className="cart-items">
                        {message ? <p className='text-center'>{message}</p> : ''}
                        {item.map((item, key) => (
                            <div className="Product" key={key}>
                                <Link to={`/product/${item._id}`}>
                                    <img src={`http://${DOMAIN}/pro-imgs/${item.filename}`} alt='{item.name}' />
                                    <h3 >{item.name}.</h3>
                                    <p>{item.description}..</p>
                                    <h4>₹{item.price}</h4>
                                </Link>
                                <div>
                                    <Button variant="success" className="m-2" onClick={() => buy(item._id)}>Buy Now</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Account
