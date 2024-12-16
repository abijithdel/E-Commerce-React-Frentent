import { Button } from 'react-bootstrap';
import './Sign-up.css'
import { useState } from 'react';

function Signup() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [cpassword, setCpassword] = useState()

    function onEmail(e){
        setEmail(e.target.value)
    }

    function onPassword(e){
        setPassword(e.target.value)
    }

    function onCPassword(e){
        setCpassword(e.target.value)
    }

    function signupAPI(){
        console.log(email, password, cpassword)
    }

    return (
        <div className='signup'>
            <div className="rap">
                <h2 className='title-font'>Sign up</h2>
                <form action="" method="post">
                    <input type="email" placeholder='Email' name='email' value={email} onChange={onEmail} />
                    <input type="password" placeholder='Password' name='password' value={password} onChange={onPassword} />
                    <input type="password" placeholder='Confirm Password' name='c-password' value={cpassword} onChange={onCPassword} />
                    <div>
                        <Button onClick={signupAPI}>Sign in</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;