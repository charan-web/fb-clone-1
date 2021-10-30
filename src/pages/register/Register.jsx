import { useRef , } from 'react'
import './register.css'
import axios from 'axios'
import {useHistory,Link} from 'react-router-dom'




function Register(){
    const history = useHistory()
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const passwordConfirm = useRef()

    const handleClick=async (e)=>{
        e.preventDefault()
        if(passwordConfirm !== password){
            passwordConfirm.current.setCustomValidity("passwords are not matching")
        }else{
            const user = {
                username:username.current.value,
                email:email.current.value,
                password:password.current.value, 
            }
            try {
                await axios.post(process.env.REACT_APP_URL+'auth/register',user)
                history.push('/')
                
                
            } catch (error) {
                
            }
           

        }

    }
    return (
        <div className='login'>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">LamaSocial</h3>
                    <span className="loginDesc">
                        Connect with Friends and world around You on Lamasocial
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input placeholder='Username' className='loginInput' type='text' required ref={username} />
                        <input placeholder='Email' className='loginInput' type='Email' required ref={email} />

                        <input placeholder='Password' className='loginInput' type='Password' ref={password} required minLength='6' />
                        <input placeholder='Confirm Password' className='loginInput' type='Password' required ref={passwordConfirm} minLength='6'/>
                        <button className="loginButton">Sign Up</button>
                        <Link to="/login">
                        <button className="loginRegisterButton">
                            Log into Account
                        </button>
                        </Link>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Register