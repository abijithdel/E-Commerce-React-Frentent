import React, { useEffect, useState, useContext } from "react";
import { Button, Container } from "react-bootstrap";
import Poster from '../../Utilities/Poster/Poster';
import { useNavigate } from 'react-router-dom';
import Axios from '../../config/axios';
import { Link } from "react-router-dom";
import { DOMAIN } from '../../config/domain';
import { toast } from 'react-toastify';
import { cartCount } from '../../AppContext';
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const [slides, setSlides] = useState([]);
  const [sliderVisible, setSliderVisible] = useState(false);
  const [specialProducts, setSpecialProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchVal, setSearchVal] = useState("");

  const CartContext = useContext(cartCount);

  useEffect(() => {
    // Fetch posters
    Axios.get('admin/allposters')
      .then(res => {
        if (res.data.status) {
          setSlides(res.data.posters);
          setSliderVisible(res.data.posters.length > 0);
        }
      })
      .catch(err => console.error(err));

    // Fetch all products
    Axios.get('admin/get-all-products')
      .then(res => {
        if (res.data.status) {
          setProducts(res.data.Products);
        }
      })
      .catch(err => console.error(err));

    // Fetch special products
    Axios.get('admin/special')
      .then(res => {
        if (res.data.status) {
          setSpecialProducts(res.data.special);
        }
      })
      .catch(err => console.error(err));
  }, []);

  const handleAddToCart = (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      Axios.post('add-to-cart', { user_id: user._id, products_id: id })
        .then(res => {
          if (res.data.status) {
            toast.success(res.data.message);
            CartContext.setCount(CartContext.Count + 1);
          } else {
            toast.error(res.data.message);
          }
        })
        .catch(err => console.error(err));
    } else {
      toast.error("Sign in Now");
    }
  };

  const handleBuyProduct = (productId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      navigate(`/order/${user._id}/${productId}`);
    } else {
      toast.warn("Create an Account");
      navigate('/signup');
    }
  };

  const handleSearch = () => {
    if (!searchVal.trim()) {
      toast.warn("Enter a search value!");
      return;
    }
    const query = searchVal.replace(/\s+/g, "-");
    navigate(`/search/${query}`);
  };

  return (
    <div className="home-page">
      <title>Home</title>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="search"
          placeholder="Search..!"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
        <Button className="btn" variant="outline-light" onClick={handleSearch}>Search</Button>
      </div>

      <Container className="home mt-2">

        {/* Slider and Special Products Section */}
        {sliderVisible && (
          <div className="main">
            <div className="slider">
              <Poster slides={slides} />
            </div>
            <div className="one-pro">
              {specialProducts.map((item, key) => (
                <Link key={key} to={`#`}>
                  <img src={`http://${DOMAIN}/pro-imgs/${item.filename}`} alt={item.name} />
                  <h2>{item.name}</h2>
                  <h3>₹{item.price}</h3>
                  <p>{item.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Products Section */}
        <div className="products mt-5">
          {products.map((item, key) => (
            <div className="Product" key={key}>
              <Link to={`/product/${item._id}`}>
                <img src={`http://${DOMAIN}/pro-imgs/${item.filename}`} alt={item.name} />
                <h3 className="text-center">{item.name}</h3>
                <p>{item.description}</p>
                <h4>₹{item.price}</h4>
              </Link>
              <div>
                <Button onClick={() => handleAddToCart(item._id)}>Add To Cart</Button>
                <Button onClick={() => handleBuyProduct(item._id)} variant="success" className="m-2">Buy Now</Button>
              </div>
            </div>
          ))}
        </div>

      </Container>
    </div>
  );
}

export default Home;