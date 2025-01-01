import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Button } from 'react-bootstrap'
import { Link, useParams } from "react-router"
import Axios from '../../config/axios'
import { DOMAIN } from '../../config/domain'
import { useNavigate } from 'react-router-dom'
import './Orders.css'

function Orders() {
  const navigator = useNavigate()
  const { user_id, product_id } = useParams()

  const [quantity, setQuantity] = useState(1)
  const [price, setPrice] = useState()
  const [product, setProduct] = useState()
  const [address, setAddress] = useState(null)
  const [paymethods, setPymethods] = useState(null)
  const [stock,setStock] = useState()

  useEffect(() => {
    // Product
    Axios({
      url: `product/${product_id}`,
      method: 'GET',
    })
      .then(response => {
        if (response.data.status) {
          setProduct(response.data.Product)
          setPrice(response.data.Product.price)
          setStock(response.data.Product.stock)
        }
      })
      .catch(err => console.log(err))
    // Address
    Axios({
      url: `get-address/${user_id}`,
      method: 'GET'
    })
      .then(response => {
        if (response.data.status) {
          setAddress(response.data.Address)
        } else {
          toast.warn('Add You Address')
        }
      })
      .catch(err => console.log(err))
  }, [product_id, user_id])

  function plusQT() {
    if (quantity === 20) {
      setQuantity(20)
      toast.warn('Max Quantity 20')
      return;
    }
    let count = quantity + 1
    setQuantity(count)
    const NewPrice = price + product?.price
    setPrice(NewPrice)
  }

  function minusQT() {
    if (quantity === 1) {
      setQuantity(1)
      toast.warn('Min Quantity 1')
      return;
    }
    let count = quantity - 1
    setQuantity(count)
    const NewPrice = price - product?.price
    console.log(NewPrice)
    setPrice(NewPrice)
  }

  function PaymentMethods(e){
    setPymethods(e.target.value)
  }

  function PlaceOrder(){
    if(!address){
      toast.warn('Add Address!')
      return;
    }

    if(!stock){
      toast.warn('Out Of Stock')
      return;
    }

    if(paymethods === 'cashon'){
      Axios({
        url:'order-cashon',
        method:'POST',
        data: { user_id,price,quantity,product,address,paymethods}
      })
      .then(response => {
        if(response.data.status){
          toast.success(response.data.message)
          setTimeout(() => {
            navigator('/your-orders')
          }, 1000);
        }
      })
      .catch(err => toast.error('Oops Server error'));
    }
    else if(paymethods === 'payon'){

    }else{
      toast.warn('Select Payment Method')
    }
  }
  console.log(product?.stock)
  return (
    <div className='orders'>
      <title>Orders</title>
      <h1 className='text-center'>Order</h1>
      <div className="main">
        <div className='type'>
          <h5>Payment Methods</h5>
          <label htmlFor="cashondelivery">Cash on Delivery <input type="radio" name='p-method' value='cashon' onChange={PaymentMethods}/></label>
          <label htmlFor="cashondelivery">pay on Delivery <input type="radio" name='p-method' value='payon' onChange={PaymentMethods}/></label>
          <Button className='mt-1' variant="outline-success" onClick={PlaceOrder}>Place Order</Button>
        </div>
        <div className='product'>
          <div className='img'>
            <img src={`http://${DOMAIN}/pro-imgs/${product?.filename}`} alt="img" />
            <div className='m-2'>
              <h2>₹{price}</h2>
              <span>{product?.category}</span>
              {product?.stock ? <p className='text-success'>In Stock</p> : <p className='text-danger'>Out of The Stock</p>}
              <div className='quantity'>
                <div>Quantity</div>
                <button onClick={plusQT}>+</button>
                <span>{quantity}</span>
                <button onClick={minusQT}>-</button>
              </div>
            </div>
          </div>
          <h1>{product?.name}</h1>
          <p>{product?.description}</p>
        </div>
        <div className='address'>
          <h2 style={{ textDecoration: 'underline' }}>Address</h2>
          {address ? <>
            <h4>{address?.name} ub</h4>
            <p>Phone: {address?.phone}</p>
            <p>PinCode: {address?.pincode}</p>
            <p>State: {address?.state}</p>
            <p>{address?.address}</p>
            <Link to='/address'>Change Address</Link>
          </>
            : <Link to='/address'>Add Address</Link>}

        </div>
      </div>
    </div>
  )
}

export default Orders
