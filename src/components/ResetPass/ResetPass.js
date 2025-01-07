import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import Axios from '../../config/axios'
import { useNavigate, useParams } from 'react-router-dom'
import './ResetPass.css'
import { toast } from 'react-toastify'
import ReCAPTCHA from 'react-google-recaptcha'
import { SITE_KEY_GOOGLE } from '../../config/settings'


function ResetPass() {
    const navigate = useNavigate()
    const { token } = useParams()
    const [password, setPassword] = useState()
    const [cpassword, setCpassword] = useState()
    const [cap,setCap] = useState(null)

    function ResetAPI() {
        if(!cap){
            toast.warn('Check Captcha')
            return;
        }
        if(!cpassword){
            return
        }
        if(!password){
            return
        }
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
                    <ReCAPTCHA  sitekey={SITE_KEY_GOOGLE}  onChange={(e) => setCap(e)}/>
                </div>
                <div>
                    <Button onClick={ResetAPI}>Save</Button>
                </div>
            </div>

        </div>
    )
}

export default ResetPass
