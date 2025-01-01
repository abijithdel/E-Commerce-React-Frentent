import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "../../config/axios";
import { Alert, Button, Container } from "react-bootstrap";
import { DOMAIN } from "../../config/domain";
import "./OneProduct.css";

function OneProduct() {
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
                <Button>
                  Add to Cart
                </Button>
                <Button className="m-2" variant="success">
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
