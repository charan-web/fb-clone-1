import { useEffect, useState,useContext } from 'react'

import './feed.css'
import Share from  './../share/Share'

import axios from 'axios'
import Posts from './../posts/posts'
import {AuthContext} from './../../context/AuthContext'



function Feed({username}){
   const [posts,setPosts] = useState([])
   const {user} = useContext(AuthContext)
   
   useEffect(()=>{
      const fetchPosts = async()=>{
         let res = username ? 
          await axios.get(`/post/profile/${username}`) :
          //! change id 
          await axios.get(`post/timeline/${username}`)
         console.log(res)

         setPosts(res.data.posts.sort((p1,p2)=>{
            return new Date(p2.createdAt) - new Date(p1.createdAt)
         }))
         
      }
      fetchPosts()
   },[username,user])

   return (
    <div className="feed">
       <div className="feedWrapper">
          { (!username || username ===user.username) && <Share/>}
         {
            posts.map(p=>{
               return <Posts key={p._id} post={p} />
            })
         }
       </div>
        
    </div>
   )

}

export default Feed