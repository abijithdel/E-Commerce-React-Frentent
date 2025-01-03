import React, { useEffect, useState } from 'react'
import { Button, Container, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Axios from '../../../config/axios'
import { DOMAIN } from '../../../config/domain'
import './AllProducts.css'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

function AllProducts() {
    const navigate = useNavigate()
    const [product, setProduct] = useState([])
    const [refresh,setRefresh] = useState(0)

    useEffect(() => {
        Axios({
            url: 'admin/get-all-products',
            method: 'GET'
        })
            .then(response => {
                if (response.data.status) {
                    setProduct(response.data.Products)
                }
            })
            .catch(err => console.log(err));
    }, [refresh])

    function DeleteProduct(product_id){
        const strUser = localStorage.getItem('user')
        if(strUser){
            const objUser = JSON.parse(strUser)

            Axios({
                url:'admin/delete-product',
                method:'DELETE',
                data:{ product_id,user_id:objUser._id}
            })
            .then(response => {
                if(response.data.status){
                    toast.success(response.data.message)
                    setRefresh(refresh + 1)
                }
            })
            .catch(err => console.log(err))
        }
    }

    function EditProduct(product_id){
        navigate(`/edit-product/${product_id}`)
    }

    return (
        <div className='admin-products'>
            <title>All Products</title>
            <Container>
                <h1 className='text-center'>All Products</h1>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Buuton's</th>
                        </tr>
                    </thead>
                    <tbody>
                        {product.map((item, key) => {
                            return (
                                <tr>
                                    <td>{key + 1}</td>
                                    <td>
                                        <Link to={`/product/${item._id}`}>
                                           <img src={`http://${DOMAIN}/pro-imgs/${item.filename}`} alt="img" />
                                        </Link>
                                        {item.name}
                                    </td>
                                    <td>{item.category}</td>
                                    <td>
                                        <Button variant='danger' onClick={() => DeleteProduct(item._id)}>Delete</Button>
                                        <Button className='m-2' onClick={() => EditProduct(item._id)}>Edit</Button>
                                        {/* <Button>Edit</Button> */}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}

export default AllProducts
