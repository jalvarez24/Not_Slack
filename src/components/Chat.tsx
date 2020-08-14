import React, { useState, useEffect } from 'react'
import Message from './Message'
import './Chat.css'
import { useParams } from 'react-router-dom'
import db from '../firebase'

//icons
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'

interface Props {
}


const Chat: React.FC = () => {

    const { roomId } = useParams()
    const [roomDetails, setRoomDetails] = useState<any>(null)
    const [roomMessages, setRoomMessages] = useState<any>([])

    useEffect(() => {
        if(roomDetails)
        console.log(roomDetails)

    }, [roomDetails])

    useEffect(() => {
        if(roomMessages)
        console.log({roomMessages})

    }, [roomMessages])    

    useEffect(() => {
        if(!roomId) return;
        db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
            setRoomDetails(snapshot.data())
        })

        db.collection('rooms')
        .doc(roomId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot(snapshot => {
            setRoomMessages(
                snapshot.docs.map(doc => {return doc.data()})
            )
        })
        
    }, [roomId])

    return <div className='chat'>
        <div className="chat__header">
            <div className="chat__headerLeft">
                <h4 className="chat__channelName">
                    <strong>#{roomDetails?.name}</strong>
                    <StarBorderOutlinedIcon />
                </h4>
            </div>
            <div className="chat__headerRight">
                <p>
                    <InfoOutlinedIcon />Details
                </p>
            </div>
        </div>
        <div className="chat__messages">
            {roomMessages.map(({ message, timestamp, user, userImage}, index) => {
                return <Message
                key={index}
                message={message}
                timestamp={timestamp}
                user={user}
                userImage={userImage}
                />
            })
            }
        </div>
    </div>;
}

export default Chat