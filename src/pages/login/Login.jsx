import {useContext, useRef}  from 'react'
import './login.css'
import {loginCall} from './../../apiCalls'
import {AuthContext} from './../../context/AuthContext'
// import {CircularProgress} from '@mui/material'



function Login(){
    
   const email = useRef()
   const password = useRef()
   const {isFetching,dispatch} = useContext(AuthContext)

  const handleClick=(e)=>{
      e.preventDefault()
      loginCall({email:email.current.value,password:password.current.value},dispatch)
        
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
                    <form className="loginBox" onSubmit={handleClick} >
                        <input placeholder='Email' className='loginInput' type='email' ref={email}
                        required
                        />
                        <input placeholder='Password' className='loginInput' type='password' ref={password}
                        required
                        minLength='6'
                         />
                            <div class="g-recaptcha"
                 data-sitekey="6Lf-PYQeAAAAAFLn64TsZormOz3rJAXjJwGEoZsE">
            </div>
                        <button className="loginButton" 
                        disabled={isFetching}>{isFetching ? "Loading..." : "LogIn"}</button>
                        <span className="loginForgot">
                            Forgot Password
                        </span>
                        <button className="loginRegisterButton">
                            Create a New Account
                        </button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Login 
