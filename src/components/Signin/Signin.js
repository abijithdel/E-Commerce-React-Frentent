import React, { useContext, useState } from 'react'
import { useNavigate,Link } from "react-router-dom";
import { Alert, Button } from 'react-bootstrap'
import Axios from '../../config/axios'
import { isLogin } from '../../AppContext'
import ReCAPTCHA from 'react-google-recaptcha'
import { SITE_KEY_GOOGLE } from '../../config/settings'
import './Signin.css'
import { toast } from 'react-toastify';

function Signin() {
    const navigate = useNavigate()
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const [errormsg,setErrormsg] = useState(null)
    const [successmsg,setSuccessmsg] = useState(null)
    const [cap,setCap] = useState(null)

    const authStatus = useContext(isLogin)

    function onEmail(e){
        setEmail(e.target.value)
    }

    function onPassword(e){
        setPassword(e.target.value)
    }

    function SigninAPI(){
        if(!cap){
            toast.warn('Check Captcha')
            return;
        }
        if(email && password){
            Axios({
                url: "auth/signin",
                method: 'POST',
                data: { email, password }
            })
            .then(res => {
                if(res.data.status){
                    setErrormsg(null)
                    setSuccessmsg(res.data.message)
                    const user = JSON.stringify(res.data.user)
                    localStorage.setItem('user',user)
                    authStatus.setLogin(true)
                    setTimeout(() => {
                        navigate('/')
                    }, 2000);
                }else{
                    setErrormsg(res.data.message)
                }
            })
            .catch(err => setErrormsg('Server Error'))
        }else{
            setErrormsg('Enter All Fields')
        }
    }
    return (
        <div className='signin'>
            <title>Sign in</title>
            <div className="rap">
                <h1 className="title-font">Sign in</h1>
                {errormsg ? <Alert variant="warning">{errormsg}</Alert>: ''}
                {successmsg ? <Alert variant="success">{successmsg}</Alert>: ''}
                <form method="post">
                    <input type="email" placeholder='Email' value={email} onChange={onEmail}/>
                    <input type="password" placeholder='Password' value={password} onChange={onPassword}/>
                    <div>
                        <Link to='/forgot-password'>forgotpassword</Link>
                    </div>
                    <div>
                        <ReCAPTCHA sitekey={SITE_KEY_GOOGLE} onChange={(e) => setCap(e)}/>
                    </div>
                    <div className='mt-1'>
                        <Button onClick={SigninAPI}>Sign in</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signin
