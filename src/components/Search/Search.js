import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Search.css';
import { Container } from 'react-bootstrap';
import Axios from '../../config/axios'
import { DOMAIN } from '../../config/domain'
import { toast } from 'react-toastify';

function Search() {
    const { quarry } = useParams();
    const [products, setProducts] = useState([])

    useEffect(() => {
        Axios({
            url: `search/${quarry}`,
            method: 'GET'
        })
            .then(response => {
                if (!response.data.status) {
                    toast.warn(response.data.message)
                    return;
                }
                setProducts(response.data.Result)
            })
            .catch(err => console.log(err))
    }, [quarry])

    return (
        <div className="search">
            <p className="text-center m-3 search-title">{quarry}</p>
            <title>{quarry}</title>
            <Container>
                {products.map((item, key) => (
                    <div className="items" key={key}>
                        <Link to={`/product/${item._id}`}>
                            <img
                            src={`http://${DOMAIN}/pro-imgs/${item.filename}`}
                                alt="Product"
                                className="item-img"
                            />
                            <h5 className="item-title">{item.name}</h5>
                            <span className="item-description">
                                {item.description}
                            </span>
                        </Link>
                    </div>
                ))}
            </Container>
        </div>
    );
}

export default Search;
