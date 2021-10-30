import './conversation.css'
import {useState,useEffect} from 'react'
import axios from 'axios'
function Conversation({conversation,currentUser}){
    const [user,setUser] = useState(null)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    useEffect(()=>{
        
        const friendId = conversation.members.find(m=>m !==  currentUser._id)

       

        const getFriend = async()=>{
            try {
                const res = await axios.get(process.env.REACT_APP_URL+'user?userId='+friendId)
                setUser(res.data.user)
            } catch (error) {
                console.log(error)
                
            }
        }
       getFriend()
    },[conversation,currentUser])

     return(
       
      <div className="coversation">
          <img src={user?.profilePicture ? PF+user.profilePicture : PF+"/default.png"} alt="user" className="conversationImg" />
          <span className="conversationName">{user?user?.username:"Loading..."}</span>
      </div>
    )
}

export default Conversation