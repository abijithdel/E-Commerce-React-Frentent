import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from '../../config/axios'
import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import './Address.css'

function Address() {
    const navigate = useNavigate()
    const [countries, setCountries] = useState([])
    const [user,setUser] = useState()
    // from
    const [countriename, setCountriename] = useState()
    const [name, setName] = useState()
    const [phone, setPhone] = useState()
    const [pincode, setPincode] = useState()
    const [address, setAddress] = useState()
    const [state, setState] = useState()

    useEffect(() => {
        if(localStorage.getItem('user')){
            const strUser = localStorage.getItem('user')
            const objUser = JSON.parse(strUser)
            setUser(objUser)

            Axios({
                url:`get-address/${objUser._id}`,
                method:'GET'
            })
            .then(response => {
                if(response.data.status){
                    console.log(response.data.Address.address)
                    setCountriename(response.data.Address.countri)
                    setName(response.data.Address.name)
                    setPhone(response.data.Address.phone)
                    setPincode(response.data.Address.pincode)
                    setAddress(response.data.Address.address)
                    setState(response.data.Address.state)
                }
            })
            .catch(err => console.log(err))
        }else{
            navigate('/')
        }
        Axios({
            url: 'all-countries',
            method: 'GET'
        })
            .then(response => setCountries(response.data))
            .catch(err => console.log(err));
    }, [navigate])

    function AddressApi(e) {

        if (name && phone && pincode && address && state && countriename) {
            Axios({
                url:'save-address',
                method:'POST',
                data:{user_id:user._id,countriename,name,phone,pincode,address,state}
            })
            .then(response => {
                toast.success(response.data.message)
                setTimeout(() => {
                    navigate('/account')
                }, 4500);
            })
            .catch(err => toast.error('Oops Server Error'));
        }else{
            toast.warn('Enter All Fields')
        }

    }

    return (
        <div className='address'>
            <title>Add Address</title>
            <h1>Address</h1>
            <form method='post'>
                <select value={countriename} onChange={(e) => setCountriename(e.target.value)}>
                    <option value="none">Select Country/Region</option>
                    {countries.map((item, key) => (
                        <option value={item} key={key}>{item}</option>
                    ))}
                </select>
                <input type="text" placeholder='Full Name' value={name} onChange={(e) => setName(e.target.value)} />
                <input type="number" placeholder='Phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
                <input type="number" placeholder='Pincode' value={pincode} onChange={(e) => setPincode(e.target.value)} />
                <textarea placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)}>{address}</textarea>
                <input type="text" placeholder='State/Region' value={state} onChange={(e) => setState(e.target.value)} />
                <div>
                    <Button className='mt-2' onClick={AddressApi}>Save</Button>
                </div>
            </form>
        </div>
    )
}

export default Address
