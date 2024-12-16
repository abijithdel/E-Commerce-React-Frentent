import { Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Sign-up.css";
import { useState } from "react";
import Axios from "../../config/axios";

function Signup() {
    const navigate = useNavigate()
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [cpassword, setCpassword] = useState();
    const [errormsg,setErrormsg] = useState(null)
    const [successmsg,setSuccessmsg] = useState(null)

    function onEmail(e) {
        setEmail(e.target.value);
    }

    function onPassword(e) {
        setPassword(e.target.value);
    }

    function onCPassword(e) {
        setCpassword(e.target.value);
    }

    async function signupAPI() {
        if (email && password && cpassword) {
            Axios({
                url: "auth/signup",
                method: "POST",
                data: { email, password, cpassword },
            })
                .then((res) => {
                    if(res.data.status){
                        setErrormsg('')
                        setSuccessmsg(res.data.message)
                        // Save Section
                        setTimeout(()=>{
                            navigate('/')
                        },2000)
                    }else{
                        setErrormsg(res.data.message)
                    }
                })
                .catch((err) => setErrormsg('Server Error'));
        }else{
            setErrormsg('Enter All Fields')
        }
    }

    return (
        <div className="signup">
            <div className="rap">
                <h2 className="title-font">Sign up</h2>
                {errormsg ?  <Alert variant="warning">{errormsg}</Alert>: ''}
                {successmsg ?  <Alert variant="success">{successmsg}</Alert>: ''}
                <form action="" method="post">
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={onEmail}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={onPassword}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="c-password"
                        value={cpassword}
                        onChange={onCPassword}
                    />
                    <div>
                        <Button onClick={signupAPI}>Sign in</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
