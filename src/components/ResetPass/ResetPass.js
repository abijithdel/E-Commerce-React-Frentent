import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import Axios from '../../config/axios'
import { useNavigate, useParams } from 'react-router-dom'
import './ResetPass.css'
import { toast } from 'react-toastify'


function ResetPass() {
    const navigate = useNavigate()
    const { token } = useParams()
    const [password, setPassword] = useState()
    const [cpassword, setCpassword] = useState()

    function ResetAPI() {
        if (password !== cpassword) {
            toast.warn("Check Confirm Password")
            return;
        }
        Axios({
            url:'auth/reset-password',
            method:'POST',
            data: { password,token }
        })
        .then(response => {
            if(response.data.status){
                toast.success(response.data.message)
                navigate('/signin')
            }else{
                toast.warn(response.data.message)
            }
        })
    }

    return (
        <div className='reset-pass'>
            <title>Reset Password</title>
            <h1>Reset Password</h1>

            <div className='form'>
                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="password" placeholder='Confirm Password' value={cpassword} onChange={(e) => setCpassword(e.target.value)} />
                <div>
                    <Button onClick={ResetAPI}>Save</Button>
                </div>
            </div>

        </div>
    )
}

export default ResetPass
