import axios from 'axios'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
export const loginCall=async(userCredentials,dispatch)=>{
    dispatch({type:"LOGIN_START"})
    try{
    const res = await axios.post(process.env.REACT_APP_URL+'auth/login',userCredentials)
    dispatch({type:"LOGIN_SUCCESS",payload:res.data.user})
    }catch(err){
        dispatch({type:"LOGIN_FAILURE",payload:err})
    }

}