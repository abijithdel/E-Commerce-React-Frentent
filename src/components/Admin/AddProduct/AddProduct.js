import React, { useState } from 'react'
import { Container, Button, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Axios from '../../../config/axios'
import './AddProduct.css'

function AddProduct() {
  const navigate = useNavigate()
  const [name, setName] = useState()
  const [price, setPrice] = useState()
  const [category, setCategory] = useState()
  const [description, setDescription] = useState()
  const [img, setImg] = useState()
  const [message, setMessage] = useState(null)

  function nameChange(e) {
    setName(e.target.value)
  }

  function pricechange(e) {
    setPrice(e.target.value)
  }

  function categorychange(e) {
    setCategory(e.target.value)
  }

  function descriptionchange(e) {
    setDescription(e.target.value)
  }

  function imgchange(e) {
    setImg(e.target.files[0])
  }

  function createPro(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('img', img);

    if (name && price && category && description && img) {
      Axios({
        url: 'admin/upload-product',
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data', },
        data: formData
      })
        .then(res => {
          if (res.data.status) {
            setMessage({ color: 'success', message: res.data.message })
            setTimeout(() => {
              navigate('/admin')
            }, 2000);
          }
        })
        .catch(err => setMessage({ color: 'warning', message: 'Server Error' }))
    } else {
      setMessage({color:'warning',message:'Fill All Fields'})
    }
  }
  return (
    <div className='AddProduct'>
      <Container>
        <title>AddProduct</title>
        <h1>AddProduct</h1>
        {message ?
          <Alert variant={message.color}>
            {message.message}
          </Alert>
          : ''
        }
        <div>
          <form method='post'>
            <input type="text" name='name' placeholder='Name' value={name} onChange={nameChange} />
            <input type="number" name='price' placeholder='Price' value={price} onChange={pricechange} />
            <input type="text" name='category' placeholder='Category' value={category} onChange={categorychange} />
            <textarea name="description" placeholder='Description' onChange={descriptionchange}>{description}</textarea>
            <input type="file" name='img' className='file' onChange={imgchange} />
            <div>
              <Button onClick={createPro}>Save</Button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  )
}

export default AddProduct
