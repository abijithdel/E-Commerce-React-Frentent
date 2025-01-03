import React, { useEffect, useState } from 'react'
import { Container, Button } from 'react-bootstrap'
import { DOMAIN } from '../../../config/domain'
import Axios from '../../../config/axios'
import './Orders.css'
import { toast } from 'react-toastify'

function Orders() {
    const [orders, setOrders] = useState([])
    const [refresh,setRefresh] = useState(0)

    useEffect(() => {
        Axios({
            url:'admin/all-orders',
            method:'GET'
        })
        .then(response => {
            if(response.data.status){
                setOrders(response.data.orders)
            }
        })
        .catch(err => console.log(err))
    }, [refresh])

    function ChangeStatus(order_id,status){
        Axios({
            url:`admin/change-order-status`,
            method:'POST',
            data: {order_id,status}
        })
        .then(response => {
            if(response.data.status){
                toast.success(response.data.message)
                setRefresh(refresh + 1)
            }else{
                setRefresh(refresh + 1)
                toast.success(response.data.message)
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <div className='admin-order'>
            <title>All Orders</title>
            <div className='main'>
                <Container>
                    {orders.map((item, key) => (
                        <div className='products' key={key}>
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
                                {item.delivery_date ? <span>Delivered Date: {item.delivery_date}</span> : ''}
                                <h3>{item.status}</h3>
                                <div>
                                    <Button variant="danger" onClick={() => ChangeStatus(item._id,'Cancel')}>Cancel</Button>
                                    <Button variant="warning" onClick={() => ChangeStatus(item._id,'Ship')} className='m-2'>Ship</Button>
                                    <Button variant="success" onClick={() => ChangeStatus(item._id,'Delivered')} className='m-2'>Delivered </Button>
                                </div>
                            </div>
                        </div>
                    ))}

                </Container>
            </div>
        </div>
    )
}

export default Orders
