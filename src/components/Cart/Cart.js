import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { DOMAIN } from '../../config/domain'
import Axios from '../../config/axios'
import './Cart.css'

function Cart() {
  const [items, setItems] = useState([])
  const [message, setMessage] = useState(null)

  useEffect(() => {
    if (localStorage.getItem('user')) {
      const StrUser = localStorage.getItem('user')
      const ObjUser = JSON.parse(StrUser)

      Axios({
        url: `cart-items/${ObjUser._id}`,
        method: 'GET'
      })
        .then(response => {
          if (response.data.status) {
            setItems(response.data.Cart)
          } else {
            setMessage(response.data.message)
          }
        })
        .catch(err => setMessage('Oops Server Error!'));
    }
  }, [])
  return (
    <div className='cart'>
      <title>Cart</title>
      {message ? <p className='text-center'>{message}</p> : ''}
      <Container>
        <div className='main'>
          {items.map((item, key) => (

            <div className="Product">
              <Link>
                <img src={`http://${DOMAIN}/pro-imgs/${item.filename}`} alt='{item.name} ' />
                <h3 >{item.name}</h3>
                <p>{item.description}</p>
                <h4>₹{item.price}</h4>
              </Link>
              <div>
                <Button variant="success" className="m-2">Buy Now</Button>
              </div>
            </div>

          ))}



        </div>
      </Container>
    </div>
  )
}

export default Cart
