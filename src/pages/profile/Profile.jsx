import {useEffect,useState} from 'react'
import './profile.css'
import Topbar from './../../components/topbar/Topbar'
import Sidebar from './../../components/sidebar/Sidebar'
import Feed from './../../components/feed/Feed'
import Rightbar from './../../components/rightbar/Rightbar'
import axios from 'axios'
import {useParams} from 'react-router'
// import {AuthContext} from './../../context/AuthContext'
function Profile(){
    const username = useParams().username
    const [user,setUser] = useState({})
    
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    useEffect(()=>{
        const fetchUser = async()=>{
           let res = await axios.get(`${process.env.REACT_APP_URL}user?username=${username}`)
           setUser(res.data.user)
           
        }
        fetchUser()
        
     },[username])
    return (
        <>
       <Topbar/>
       <div className="profile">
            <Sidebar/>
            <div className="profileRight">
                <div className="profileRightTop">
                    <div className="profileCover">
                        <img className='profileCoverImg' src={user.coverPicture ? PF+user.coverPicture : PF+"/default.png"} alt="post1" />
                        <img className='profileUserImg' src={user.profilePicture ? PF+user.profilePicture : PF+"/default.png"}  alt="post2" />
                    </div>
                    <div className="profileInfo">
                        <h4 className='profileInfoName' >{user.username}</h4>
                        <span className='profileInfoDesc' >{user.desc}</span>
                    </div>
                </div>
                <div className="profileRightBottom">
                <Feed username={username}/>
              <Rightbar user={user}/>

                </div>
            </div>
           
       </div>
       </>
    )
}

export default Profile