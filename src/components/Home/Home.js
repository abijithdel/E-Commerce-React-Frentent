import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import Poster from '../../Utilities/Poster/Poster'
import Axios from '../../config/axios'
import { Link } from "react-router-dom";
import { DOMAIN } from '../../config/domain'
import {  toast } from 'react-toastify';
import "./Home.css";

function Home() {

  const [slides, setSlider] = useState()
  const [sliderTrue, setSliderTrue] = useState()
  const [special, setSpecial] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() => {
    // POSTER API
    Axios({
      url: 'admin/allposters',
      method: 'GET'
    })
      .then(res => {
        if (res.data.status) {
          setSlider(res.data.posters)
          if (res.data.posters.length === 0) {
            setSliderTrue(false)
          } else {
            setSliderTrue(true)
          }
        }
      })
      .catch(err => console.log(err));
    // ProDuct API
    Axios({
      url: 'admin/get-all-products',
      method: "GET"
    })
      .then(res => {
        if (res.data.status) {
          setProducts(res.data.Products)
        }
      })
      .catch(err => console.log(err));
    // Special API
    Axios({
      url: 'admin/special',
      method: 'GET'
    })
      .then(res => {
        if (res.data.status) {
          setSpecial(res.data.special)
        }
      })
      .catch(err => console.log(err))
  }, [])

  function AddtoCart(id){
    if(localStorage.getItem("user")){
      const user = localStorage.getItem("user")
      const obj = JSON.parse(user)
      Axios({
        url:'add-to-cart',
        method:'POST',
        data: { user_id:obj._id, products_id:id }
      })
      .then((response => {
        if(response.data.status){
          toast.success(response.data.message)
        }else{
          toast.error(response.data.message)
        }
      }))
      .catch(err => console.log(err))
    }else{
      toast.error('Sign in Now')
    }
  }



  return (

    <div className="home-page">
      <title>Home</title>
      <div className="search-container">
        <input type="search" placeholder="Search..!" />
        <Button className="btn" variant="outline-light">Search</Button>
      </div>
      <Container className="home mt-2">
        {sliderTrue ?
          <div className="main">
            <div className="slider">
              <Poster slides={slides} />
            </div>
            <div className="one-pro">
              {special.map((item, key) => {
                return (

                  <Link key={key}>
                    <img src={`http://${DOMAIN}/pro-imgs/${item.filename}`} alt={item.name} />
                    <h2>{item.name}</h2>
                    <h3>₹{item.price}</h3>
                    <p>{item.description}</p>
                  </Link>

                )
              })}
            </div>
          </div>
          : ''}
        <div className="products mt-5">
          {products.map((item, key) => (
            
              <div className="Product">
                <Link key={key} to={`/product/${item._id}`}>
                <img src={`http://${DOMAIN}/pro-imgs/${item.filename}`} alt={item.name} />
                <h3 className="text-center">{item.name}.</h3>
                <p>{item.description}..</p>
                <h4>₹{item.price}</h4>
                </Link>
                <div>
                  <Button onClick={() => AddtoCart(item._id)}>Add To Cart</Button>
                  <Button variant="success" className="m-2">Buy Now</Button>
                </div>
              </div>
            
          ))}
        </div>
      </Container>
    </div>

  );
}

export default Home;