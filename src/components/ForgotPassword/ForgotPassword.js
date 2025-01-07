import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import Axios from '../../config/axios'
import './ForgotPassword.css'
import { SITE_KEY_GOOGLE } from '../../config/settings'
import ReCAPTCHA from 'react-google-recaptcha'
import { toast } from 'react-toastify'

function ForgotPassword() {
    const [email,setEmail] = useState()
    const [cap,setCap] = useState(null)

    function SendMail(){
        if(!cap){
            toast.warn('Check Captcha')
            return;
        }
        if(!email){
            toast.warn('Enter Email ID')
            return;
        }
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
                <input className='mb-2' type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <div>
                    <ReCAPTCHA sitekey={SITE_KEY_GOOGLE} onChange={(e) => setCap(e)} />
                </div>
                <div className='mt-2'>
                    <Button onClick={SendMail}>Send Mail</Button>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
