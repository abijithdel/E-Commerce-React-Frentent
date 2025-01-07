import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import Axios from '../../config/axios'
import './ForgotPassword.css'
import { toast } from 'react-toastify'

function ForgotPassword() {
    const [email,setEmail] = useState()

    function SendMail(){
        Axios({
            url:'auth/forgot-password',
            method:'POST',
            data: { email }
        })
        .then(response => {
            if(response.data.status){
                toast.success(response.data.message)
            }else{
                toast.warn(response.data.message)
            }
        })
        .catch(err => toast.error('Oops Server Error!'))
    }

    return (
        <div className='forgot-password'>
            <title>Forgot Password</title>
            <h2>Forgot Password</h2>
            <div className='form'>
                <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <div className='mt-2'>
                    <Button onClick={SendMail}>Send Mail</Button>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
