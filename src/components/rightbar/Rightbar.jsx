import './rightbar.css'
import Online from './../onlinefriends/Online'
import {Users} from './../../dummydata'
import { useState ,useEffect,useContext} from 'react'
import axios from 'axios' 
import {Link} from 'react-router-dom'
import {AuthContext} from './../../context/AuthContext'
import {Add, Remove} from '@mui/icons-material'
function Rightbar({user}){
    const {user:currentuser,dispatch} = useContext(AuthContext)
    const [friends,setFriends] = useState([])
    const [followed,setFollowed] = useState(currentuser.followings.includes(user?._id))
  


    useEffect(()=>{
       
        const getFriends = async ()=>{
            
            try{
                const res = await axios.get('/user/friends/'+user?._id)
                setFriends(res.data.friendList)
               
            }catch(error){
                console.log(error) 
            }
           
        }
        getFriends()
    },[user])


    const handleClick=async()=>{
            try {
                if(followed){
                    await axios.put('/user/'+user._id+'/unfollow',{userId:currentuser._id})
                    dispatch({type:"UNFOLLOW",payload:user._id})
                }else{
                    await axios.put('/user/'+user._id+'/follow',{userId:currentuser._id})
                    dispatch({type:"FOLLOW",payload:user._id})
                }
                
            } catch (error) {
                console.log(error)
                
            }
            setFollowed(!followed)
    }

const HomeRightPage = ()=>{
    return (
        <>
        <div className="birthdayContainer">
                       <img className="birthdayImg" src="/assets/ad.jfif" alt="ad" />
                       <span className="birthdayText">
                           <b>polard</b> and other 3 birthdays today
                       </span>
                   </div>
                   
                   <img className='rightbarAd' src="/assets/ad.jfif" alt="ad" />
                   <h4 className="rightbarTitle">
                       Online Friends
                   </h4>
                   <ul className="rightbarFriendList">
                      {
                          Users.map(u=>{
                              return <Online key={u.id} user={u}/>
                          })
                      }
                      
                   </ul>
        </>
    )
}

const ProfileRightPage = ()=>{
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    return (
        <>
        {user.username !== currentuser.username &&(
            <button onClick={handleClick}className="rightbarFollowButton">
                {followed ? "Unfollow" : "Follow"}
               {followed ? <Remove/> : <Add/>}
            </button>
        )}
        <h4 className="rightbarTitle">
                 User Information 
        </h4>
         <div className="rightbarInfo">
             <div className="rightbarInfoItem">
                 <span className="rightbarInfoKey">City :</span>
                 <span className="rightbarInfoValue">{user.city}</span>
             </div>
             <div className="rightbarInfoItem">
                 <span className="rightbarInfoKey">From :</span>
                 <span className="rightbarInfoValue">{user.from}</span>
             </div>
             <div className="rightbarInfoItem">
                 <span className="rightbarInfoKey">Relationship :</span>
                 <span className="rightbarInfoValue">{user.relationship}</span>
             </div>
             <h4 className='rightbarTitle'>User Friends</h4>
             <div className="rightbarFollowings">
                 {
                    
                     friends.map(friend=>{
                        return <Link key={friend._id} to={friend.username} 
                        style={{textDecoration:"none"}}>
                        <div className="rightbarFollowing">
                        <img className='rightbarFollowingImg'
                         src={friend.profilePicture ? PF+friend.profilePicture:`${PF}/default.png`} alt="" />
                        <span className='rightbarFollowingName' >{friend.username}</span>
                    </div>
                    </Link>
                     })
                     
                 }
             </div>
         </div>


        </>
    )
}

       return (
           <div className="rightbar">
               <div className="rightbarContainer">
                   {user ? <ProfileRightPage/> : <HomeRightPage/>}
               </div>

           </div>
       )
}

export default Rightbar