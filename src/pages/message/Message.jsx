import './message.css'
import {format} from 'timeago.js'

function Message({own,message}){
    return (
        <div className={own?"message own" : "message"}>
            <div className="messageTop">
                <img src="/assets/defaut.png" className='messageImg' alt="" />
                <p className='messageText'>{message.text} </p>

            </div>
            <div className="messageBottom">
                    {format(message.createdAt)}
            </div>

        </div>
    )
}

export default Message