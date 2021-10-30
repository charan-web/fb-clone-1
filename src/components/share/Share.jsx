import {useContext, useRef, useState} from 'react'
import './share.css'
import {PermMedia, Label,Room, EmojiEmotions, Cancel} from '@mui/icons-material'
import {AuthContext} from './../../context/AuthContext'
import axios from 'axios'
// import ad from './ad.jfif'
function Share(){
    const {user} = useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
     const [file,setFile] = useState(null)
    const desc = useRef()
    // let file = null


    const upload=(e)=>{
        // file = e.target.files[0]
        setFile(e.target.files[0])
        console.log(file)
    }

    const submitHandler=async (e)=>{
        e.preventDefault()
        const newPost ={
            userId:user._id,
            desc:desc.current.value,
        }
        if(file){
            const data = new FormData()
            const filename = Date.now() + file.name
            // data.file=file
            // data.name = filename
            data.append("file",file)
            data.append("name",filename)
            newPost.img = filename
            console.log(data)
            try { 
                await axios.post(process.env.REACT_APP_URL+'upload/',data)
                
            } catch (error) {
                console.log(error)
            }
        }
       try{
            console.log(newPost)
           await axios.post(process.env.REACT_APP_URL+'post/',newPost)
          
           window.location = '/'
       }catch(err){
           console.log(err)
       }
    }

  

    return ( 
        <div className='share'>
            <div className='shareWrapper'>
                <div className="shareTop">
                    <img className='shareProfileImg' 
                    src={user.profilePicture ? PF+user.profilePicture : PF+'/default.png'} alt="people1" />
                    <input ref={desc}
                    placeholder={`Whats on your mind ${user.username} ?`} type='text' className='shareInput'/>
                </div>
                <hr className='shareHr'/>
                
                { file ?(
                    <div className="shareImgContainer">
                        <img src={URL.createObjectURL(file)} className="shareImgFile" alt="poeple" />
                        <Cancel className="shareCancel" onClick={()=>setFile(null)}/>
                    </div>
                ):null}
                <form className="shareBottom" onSubmit={submitHandler}>
                  <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMedia htmlColor='tomato' className="shareIcon"/>
                            <span className='shareOptionText'>Photo/Video</span>
                            <input style={{display:"none"}} id="file" type="file" accept=".png,.jpeg,.jpg" onChange={upload}/>
                        </label>
                        <div className="shareOption">
                             <Label 
                             htmlColor='blue'
                              className="shareIcon"/>
                            <span className='shareOptionText'>Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room  
                            htmlColor='green'
                            
                            className="shareIcon"/>
                            <span className='shareOptionText'>Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions
                            htmlColor='goldenrod' 
                            className="shareIcon"/>
                            <span className='shareOptionText'>Feelings</span>
                        </div>

                    </div>
                     <button 
                     type="submit" className="shareButton">Share</button>
                </form>
               
            
            </div>
            
        </div>
    )

}

export default Share 