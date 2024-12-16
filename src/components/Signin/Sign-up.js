import './Sign-up.css'

function Signup() {
    return (
        <div className='signup'>
            <div className="rap">
                <h2 className='title-font'>Sign up</h2>
                <form action="" method="post">
                    <input type="email" placeholder='Email' name='email' />
                    <input type="password" placeholder='Password' name='password' />
                    <input type="password" placeholder='Confirm Password' name='c-password' />
                </form>
            </div>
        </div>
    );
}

export default Signup;