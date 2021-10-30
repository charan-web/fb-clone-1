import { useEffect, useState } from 'react'
import './chatonline.css'
import axios from 'axios'


function ChatOnline({onlineusers,setCurrentChat,currentId}){
    const PF=process.env.REACT_APP_PUBLIC_FOLDER
    const [friends,setFriends] = useState([])
    const [onlineFriends,setOnlineFriends] = useState([])

    useEffect(()=>{
        
     const getFriends= async()=>{
         const res = await axios.get(process.env.REACT_APP_URL+'user/friends/'+currentId)
         console.log(res)
         setFriends(res.data.friendList)
     }
     getFriends()
    },[currentId])
console.log(friends)
    useEffect(()=>{
        setOnlineFriends(friends.filter(f=>onlineusers.includes(f._id)))
    },[friends,onlineusers])



const handleClick=async (e)=>{
    try{
       const res = await axios.get(process.env.REACT_APP_URL+'conversation/find/'+currentId+'/'+e._id)
       setCurrentChat(res.data)
    }catch(err){
console.log(err)
    }
}

    return (
        <div className="chatOnline" >
          {
              onlineFriends.map(o=>{
               return <div className="chatOnlineFriend"  onClick={()=>handleClick(o)} >
                <div className="chatOnlineImgContainer">
                    <img 
                    className="chatOnlineImg" src={o?.profilePicture ? PF+o.profilePicture : PF+"/default.png"} alt="" />
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName">o.username</span>
               

            </div>
           
              })
          }
        </div>
    )
}

export default ChatOnline