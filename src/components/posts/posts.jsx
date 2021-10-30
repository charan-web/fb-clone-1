import {useState,useEffect,useContext} from 'react'
import './posts.css'
import {MoreVert} from '@mui/icons-material'
import axios from 'axios'
import {format} from 'timeago.js'
import {Link} from 'react-router-dom'
import {AuthContext} from './../../context/AuthContext'

function Posts({post}){
    const {user:currentUser} = useContext(AuthContext)
    const [like,setLike] = useState(post.likes.length)
    const [user,setUser] = useState({})
    const [isLike,setIslike] = useState(false)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    console.log(PF)



    useEffect(()=>{
        setIslike(post.likes.includes(currentUser._id))
    },[currentUser._id,post.likes])

    useEffect(()=>{
        const fetchUser = async()=>{
           let res = await axios.get(`/user?userId=${post.userId}`)
           setUser(res.data.user)
           console.log(res)
        }
        fetchUser()
     },[post.userId])


    const likeHandler =async ()=>{
     try{
        await axios.put(`/post/${post._id}/like`,{userId:currentUser._id})
        setLike(isLike ? like-1:like+1)
        setIslike(!isLike)

     }catch(err){
           console.log(err)
     }
    }

    return (
        <div className='posts'>
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`} style={{textDecoration:"none"}}>
                        <img className='postProfileImg' src={user.profilePicture ? PF + user.profilePicture : `${PF}/default.png`} alt="people1" />
                        </Link>
                        <span className="postUsername">{user.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                       
                    </div>
                    
                    <div className="postTopRight">
                    <MoreVert/>
                    </div>
                </div>
                <div className="postCenter">
                    <div className="postText">{post?.desc}</div>
                    <img className="postImg" src={`${PF}/${post?.img}`}alt="people1" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                       <img onClick={likeHandler} className='likeIcon' src={`${PF}/like.png`}alt="like" />
                       <img onClick={likeHandler} className='likeIcon' src={`${PF}/heart.png`} alt="heart" />
                       <span className="postLikeCounter">`{like} people like this`</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">`{post.comment} comments`</span>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Posts 