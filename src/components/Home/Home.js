import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Poster from '../../Utilities/Poster/Poster'
import Axios from '../../config/axios'
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  const [slides, setSlider] = useState()
  const [sliderTrue, setSliderTrue] = useState()

  useEffect(() => {
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
              <Link>
                <img src="http://localhost:3001/pro-imgs/img-1735413385682-724367066.jpg" alt="img" />
                <h2>I Phone</h2>
                <h3>₹2080</h3>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
              </Link>

              <Link>
                <img src="http://localhost:3001/pro-imgs/img-1735413385682-724367066.jpg" alt="img" />
                <h2>I Phone</h2>
                <h3>₹2080</h3>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
              </Link>
            </div>
          </div>
          : ''}

      </Container>
    </div>

  );
}

export default Home;
