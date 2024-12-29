import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import Poster from '../../Utilities/Poster/Poster'
import Axios from '../../config/axios'
import { Link } from "react-router-dom";
import { DOMAIN } from '../../config/domain'
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

  return (

    <div className="home-page">
      <title>Home</title>
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
            <Link key={key}>
              <div className="Product">
                <img src={`http://${DOMAIN}/pro-imgs/${item.filename}`} alt={item.name} />
                <h3 className="text-center">{item.name}</h3>
                <p>{item.description}</p>
                <h4>₹{item.price}</h4>
                <div>
                  <Button>Add To Cart</Button>
                  <Button variant="success" className="m-2">Buy Now</Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>

  );
}

export default Home;