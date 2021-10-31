import ChatOnline from './../chatonline/ChatOnline'
import "./messenger.css";
import Topbar from "./../../components/topbar/Topbar";
import Conversation from "./../conversation/Conversation";
import Message from "../message/Message";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "./../../context/AuthContext";
import axios from "axios";
import {io} from "socket.io-client"
function Messenger() {
  //  const socket = useRef(io("ws://localhost:8900"))
  const socket = useRef()
 
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage,setNewArrivalMessage] = useState(null)
  const [onlineUsers,setOnlineUsers] = useState([])
 
  const scrollRef = useRef();
  const { user } = useContext(AuthContext);



  // io("https://react-chat-app-by-me.herokuapp.com/")
  // Access-Control-Allow-Origin
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

useEffect(()=>{
    socket.current =io("https://react-chat-app-by-me.herokuapp.com/",{
      extraHeaders:{
        "Allow-Access-Control-Origin":"*"
      }
    })
     socket.current?.on("getMessage",data=>{
        setNewArrivalMessage({
          sender:data.senderId,
          text:data.text,
          createdAt:Date.now()
        })
     })
},[])



useEffect(()=>{
  
  arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && setMessage(prev=>[...prev,arrivalMessage])

},[arrivalMessage,currentChat])


// 17214
useEffect(()=>{
  socket.current.emit("addUsers",user._id)
  socket.current?.on("getUsers",users=>{
   setOnlineUsers(user.followings.filter(f=>users.some(u=>u.userId===f)))
  })
},[user,socket])

  useEffect(() => {
    const getConversation = async () => {
       
      try {
        const res = await axios.get(process.env.REACT_APP_URL+"conversation/" + user?._id);
        
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversation();
  }, [user]);
 

  useEffect(() => {
    const getMessages = async () => {
      try {
        
        const res = await axios.get(process.env.REACT_APP_URL+"message/"+currentChat?._id);
        setMessage(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat?._id,
    };
    
    const receiverId = currentChat.members.find(m=> m !==user._id)

      socket.current?.emit('sendMessage',{
        senderId:user._id,
        receiverId,
        text:newMessage
      })


    try {
      const res = await axios.post(process.env.REACT_APP_URL+"message", message);
      setMessage([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);
  return (
    <>
      <Topbar />
    <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              type="text"
              placeholder="Search for Friends"
              className="chatMenuInput"
            />
            {
              conversations.map(c=>{
               return (
                 <>
               <div onClick={()=>setCurrentChat(c)}>
                <Conversation key={c._id} conversation={c} currentUser={user}/>
                </div>
                </>)
                
              })
            }
          
           
          </div>
          
          
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m,id) => {
                    return (
                      
                      <div ref={scrollRef}>
                        <Message key={id} message={m} own={m.sender === user._id} />
                      </div>
                    );
                  })}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                    className="chatMessageInput"
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    placeholder="write Something..."
                  ></textarea>
                  <button onClick={handleSubmit} className="chatSubmitButton">
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversation">Open a new Conversation</span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper" >
            <ChatOnline key={user._id} onlineusers={onlineUsers} currentId = {user._id}
            setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
    </div>
    </>
  );
}

export default Messenger;
