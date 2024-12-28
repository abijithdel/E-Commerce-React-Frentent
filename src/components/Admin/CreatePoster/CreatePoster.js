import React, { useState } from 'react'
import Axios from '../../../config/axios'
import { Button, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './CreatePoster.css'

function CreatePoster() {
    const Navigate = useNavigate()
    const [title, setTitle] = useState()
    const [img, setImg] = useState()
    const [message, setMessage] = useState()

    function SavePoster() {
        const formdata = new FormData()
        formdata.append("title", title)
        formdata.append("posterimg", img)

        Axios({
            url: "admin/createposter",
            method: "POST",
            headers: { 'Content-Type': 'multipart/form-data', },
            data: formdata
        })
            .then(response => {
                if (response.data.status) {
                    setMessage({ color: 'success', message: response.data.message })
                    setTimeout(() => {
                        Navigate('/admin')
                    }, 2000);
                }
            })
            .catch(err => setMessage({ color: 'danger', message: 'Server Error' }))
    }
    return (
        <div className='createposter'>
            <title>Create poster</title>
            <h1>Create Poster</h1>
            {message ?
                <Alert variant={message.color}>
                    {message.message}
                </Alert>
                : ''
            }

            <form method="post">
                <input type="text" placeholder='Enter Text(Poster Title)' name='title' value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="file" name='img' className='mt-2' onChange={(e) => setImg(e.target.files[0])} />
                <div className='mt-2'>
                    <Button onClick={SavePoster}>Create</Button>
                </div>
            </form>
        </div>
    )
}

export default CreatePoster
