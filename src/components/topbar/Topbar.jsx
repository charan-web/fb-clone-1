import {useContext} from 'react'
import './topbar.css'
import {Search,Person,Chat,Notifications} from "@mui/icons-material"
import {Link} from 'react-router-dom'
import {AuthContext} from './../../context/AuthContext'

function Topbar(){
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const {user} = useContext(AuthContext)
        return (
           <>
           <div className="topbarContainer">
           <div className="topbarLeft">
               <Link to='/' style={{textDecoration:"none"}}>
                   <span className='logo'>LamaSocial</span>
                   </Link>
               </div>
               <div className="topbarCenter">
                   <div className="searchBar">
                   <Search className='searchIcon'/>
                   <input placeholder='search for friend,post or video' type='text' className='searchInput' />
                   </div>
               </div>
               <div className="topbarRight">
                   <div className="topbarLinks">
                       <span className='topbarLink'>HomePage</span>
                       <span className='topbarLink'>TimeLine</span>
                    </div>
                    <div className="topbarIcons">
                            <div className="topbarIcon">
                                <Person/>
                                <span className='topbarIconbadge'>1</span>
                                </div>
                            {/* <div className="topbarIcon"> */}
                                <Link to="/messages" className="topbarIcon">
                                <Chat/>
                                <span className='topbarIconbadge'>1</span>
                                </Link>
                                 {/* </div> */}
                            <div className="topbarIcon">
                                <Notifications/>
                                <span className='topbarIconbadge'>1</span>
                                </div>
                      
                   
               </div>
               <Link to={`/profile/${user.username}`}>
               <img src={user.profilePicture ?  PF+user.profilePicture : PF +'/default.png'} alt='people1' className="topbarImg"/>
               </Link>
               </div>
              
               
           </div>
              
           </>
          
        )
}

export default Topbar