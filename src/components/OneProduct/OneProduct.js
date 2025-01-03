import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "../../config/axios";
import { Alert, Button, Container } from "react-bootstrap";
import { DOMAIN } from "../../config/domain";
import "./OneProduct.css";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'

function OneProduct() {
  const navigate = useNavigate()
  const { id } = useParams();
  const [Product, setProduct] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    Axios({
      url: `/product/${id}`,
    })
      .then((response) => {
        if (response.data.status) {
          setProduct(response.data.Product);
        }
      })
      .catch((err) => setError("Oops Server Error"));
  }, [id]);

  function AddtoCart(product_id){
    const struser = localStorage.getItem('user')
    if(!struser){
      toast.warn('Sign in Now')
      return;
    }
    const objuser = JSON.parse(struser);
    Axios({
      url:'add-to-cart',
      method:'POST',
      data:{ User_id:objuser._id,product_id}
    })
    .then(response => {
      if(response.data.status){
        toast.success(response.data.message)
      }else{
        toast.warn(response.data.message)
      }
    })
  }

  function buy(produc_id){
    const struser = localStorage.getItem('user')
    if(!struser){
      toast.warn('Sign in Now')
      return;
    }
    const objuser = JSON.parse(struser)
    navigate(`/order/${objuser._id}/${produc_id}`)
  }

  return (
    <div className="product-page">
      <title>{Product?.name}</title>
      {error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Container>
          <div className="product">
            <div className="img">
              <img
                src={`http://${DOMAIN}/pro-imgs/${Product?.filename}`}
                alt="img"
              />
            </div>
            <div className="main">
              <h1>{Product?.name}</h1>
              <span className="text-secondary">{Product?.category}</span>
              {Product?.stock ? <p className="text-success">In Stock</p>: <p className="text-danger">Out of The Stock</p>}
              <h3>${Product?.price}</h3>
              <div>
                <Button onClick={() => AddtoCart(Product?._id)}>
                  Add to Cart
                </Button>
                <Button className="m-2" variant="success" onClick={() => buy(Product?._id)}>
                  Buy
                </Button>
              </div>
              <p className="mt-3">{Product?.description}</p>
            </div>
          </div>
        </Container>
      )}
    </div>
  );
}

export default OneProduct;
