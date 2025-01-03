import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import Axios from '../../../config/axios'
import { DOMAIN } from '../../../config/domain'
import { toast } from 'react-toastify'
import './EditProduct.css'

function EditProduct() {
  const { produc_id } = useParams()

  const [name, setName] = useState()
  const [price, setPrice] = useState()
  const [category, setCategory] = useState()
  const [description,setDescription] = useState()
  const [img,setImg] = useState()
  const [preview, setPreview] = useState('');

  useEffect(() => {
    Axios({
      url: `product/${produc_id}`,
      method: 'GET'
    })
      .then(response => {
        if (response.data.status) {
          setName(response.data.Product.name)
          setPrice(response.data.Product.price)
          setCategory(response.data.Product.category)
          setDescription(response.data.Product.description)
          setImg(response.data.Product.filename)
          setPreview(`http://${DOMAIN}/pro-imgs/${response.data.Product.filename}`);
        } else {
          toast.warn(response.data.message)
        }
      })
      .catch(err => console.log(err))
  }, [produc_id])

  function SaveProduct(){
    if(!name && price && category && description){
      toast.warn('Enter All Fields')
      return;
    }
    const formData = new FormData()
    formData.append('name',name)
    formData.append('price',price)
    formData.append('category',category)
    formData.append('description',description)
    formData.append('newimg',img)
    formData.append('product_id',produc_id)
    
    Axios({
      url:'admin/edit-product',
      method:'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
    })
    .then(response => {
      if(!response.data.status){
        toast.error(response.data.message)
      }else{
        toast.success(response.data.message)
      }
    })
    .catch(err => console.log(err))
  }

  function changeIMG(e){
    const file = e.target.files[0];
    setImg(file)
    setPreview(URL.createObjectURL(file))
  }

  return (
    <div className='edit-product'>
      <title>Edit Product</title>
      <h1>Edit Product</h1>
      <form method='post'>
        <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}/>
        <input type="number" placeholder='Price' value={price} onChange={(e) => setPrice(e.target.value)} />
        <input type="text" placeholder='Category' value={category} onChange={(e) => setCategory(e.target.value)}/>
        <textarea placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        <input style={{padding:0}} type="file" name='newimg' onChange={changeIMG}/>
        <img src={preview} alt="img" />
        <Button onClick={SaveProduct}>Save</Button>
      </form>
    </div>
  )
}

export default EditProduct
