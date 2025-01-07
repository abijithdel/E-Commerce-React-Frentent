import { Button } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Axios from '../../config/axios'
import './EditUser.css'
import { toast } from 'react-toastify';

function EditUser() {
  const navigate = useNavigate()

  const [user,setUser] = useState()
  const [email,setEmail] = useState()

  useEffect(() => {
    const struser = localStorage.getItem('user');
    if(!struser){
      navigate('/')
    }
    const objuser = JSON.parse(struser)
    setUser(objuser)
    setEmail(objuser.email)

  },[navigate])

  function SaveEmail(){
    Axios({
      url:'edit-user',
      method:'POST',
      data: { email, user_id:user?._id}
    })
    .then(response => {
      if(response.data.status){
        toast.success(response.data.message)
        const struser = JSON.stringify(response.data.user)
        localStorage.setItem('user',struser)
        navigate('/account')
      }else{
        toast.error(response.data.message)
      }
    })
    .catch(err => console.log(err))
  }

  return ( 
    <div className='edit-user'>
      <title>{user?.email}</title>
      <h1 className='title-font'>Edit User</h1>
      <form method='post'>
        <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <div>
          <Button className='mt-2' onClick={SaveEmail}>Save</Button>
        </div>
      </form>
    </div>
  )
}

export default EditUser
