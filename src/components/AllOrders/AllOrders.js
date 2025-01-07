import React, { useEffect, useState } from 'react'
import Axios from '../../config/axios'
import { Button, Container } from 'react-bootstrap'
import { DOMAIN } from '../../config/domain'
import './AllOrders.css'
import { toast } from 'react-toastify'

function AllOrders() {
  const [orders, setOrders] = useState([])
  const [refresh,setRefresh] = useState(0)

  useEffect(() => {
    const strUser = localStorage.getItem('user')
    if (strUser) {

      const objUser = JSON.parse(strUser)
      Axios({
        url: `orders/${objUser._id}`,
        method: 'GET'
      })
        .then(response => {
          if (response.data.status) {
            setOrders(response.data.orders)
          }
        })
        .catch(err => console.log(err))
    }

  }, [refresh])

  const statusStyles = {
    'Order Delivered': 'text-success',
    'Order Cancelled': 'text-danger',
    'Order Shipped': 'text-warning',
    'Preparing for Shipment': '',
  };

  function cancelOrder(order_id){
    const status = 'Cancel'
    Axios({
      url:'admin/change-order-status',
      method:'POST',
      data: { order_id, status }
    })
    .then(response => {
      if(response.data.status){
        setRefresh(refresh + 1)
        toast.success(response.data.message)
      }else{
        toast.warn(response.data.message)
      }
    })
    .catch(err => toast.error('Server Error'))
  }
 
  return (
    <div className='all-orders'>
      <title>Your Oders</title>
      <h1 className='text-center'>Order's</h1>
      <div className='main'>
        <Container>
          {orders.map((item, key) => (
            <div className='products'>
              <div className='product'>
                <img src={`http://${DOMAIN}/pro-imgs/${item.product[0].filename}`} alt="img" />
                <div className='m-2 inner'>
                  <h3>{item.product[0].name}</h3>
                  <h2>${item.amount}</h2>
                  <p>Quantity:{item.quantity}</p>
                  <p>{item.product[0].description}</p>
                </div>
              </div>
              <div className='ord-address'>
                <h3>Address</h3>
                <h5>{item.address[0].name}</h5>
                <h6>{item.address[0].countri},{item.address[0].state},{item.address[0].address},Pin:{item.address[0].pincode},(PH){item.address[0].phone}</h6>
                <span>Date: {item.order_date}</span>
                {item.delivery_date ? <span>Delivered Date: {item.delivery_date}</span>:''}
                <h3 className={statusStyles[item.status]}>{item.status}</h3>
                <div>
                  {item.status === 'Preparing for Shipment'? <Button variant="warning" onClick={() => cancelOrder(item._id)}>Cancel</Button>: ''}
                  <Button variant="success" className='m-2'>Contact</Button>
                </div>
              </div>
            </div>
          ))}

        </Container>
      </div>
    </div>
  )
}

export default AllOrders
