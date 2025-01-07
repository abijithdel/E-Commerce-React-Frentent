import React, { useEffect, useState } from 'react'
import { Alert, Button } from 'react-bootstrap'
import Axios from '../../config/axios'
import { useParams } from 'react-router-dom'
import './ResetPass.css'


function ResetPass() {
    const { token } = useParams()
    const [trueuser, setTrueuser] = useState(false)
    const [message,setMessage] = useState('Token Error')

    useEffect(() => {
        Axios({
            url: 'auth/verify-token',
            method: 'POST',
            data: { token }
        })
            .then(response => {
                if (response.data.status) {
                    setTrueuser(true)
                }else{
                    setTrueuser(false)
                    setMessage(response.data.message)
                }
            })
            .catch(err => console.log(err))
    }, [token])
    return (
        <div className='reset-pass'>
            <title>Reset Password</title>
            <h1>Reset Password</h1>
            {trueuser ?
                <div className='form'>
                    <input type="password" placeholder='Password' />
                    <input type="password" placeholder='Confirm Password' />
                    <div>
                        <Button>Save</Button>
                    </div>
                </div> : <Alert>{message}</Alert>}

        </div>
    )
}

export default ResetPass
