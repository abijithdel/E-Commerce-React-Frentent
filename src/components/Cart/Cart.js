import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { DOMAIN } from '../../config/domain'
import Axios from '../../config/axios'
import { useNavigate } from 'react-router-dom'
import './Cart.css'

function Cart() {
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [message, setMessage] = useState(null)
  const [user,setUser] = useState()

  useEffect(() => {
    if (localStorage.getItem('user')) {
      const StrUser = localStorage.getItem('user')
      const ObjUser = JSON.parse(StrUser)
      setUser(ObjUser)

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

  function buy(product_id){
    navigate(`/order/${user._id}/${product_id}`)
  }
  return (
    <div className='cart'>
      <title>Cart</title>
      {message ? <p className='text-center'>{message}</p> : ''}
      <Container>
        <div className='main'>
          {items.map((item, key) => (

            <div className="Product">
              <Link to={`/product/${item._id}`}>
                <img src={`http://${DOMAIN}/pro-imgs/${item.filename}`} alt='{item.name} ' />
                <h3 >{item.name}</h3>
                <p>{item.description}</p>
                <h4>₹{item.price}</h4>
              </Link>
              <div>
                <Button onClick={() => buy(item._id)} variant="success" className="m-2">Buy Now</Button>
              </div>
            </div>

          ))}



        </div>
      </Container>
    </div>
  )
}

export default Cart
