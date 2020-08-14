import React, { useState, useEffect } from 'react'
import './Message.css'
import { useParams } from 'react-router-dom'
import db from '../firebase'

//icons

interface Props {
    message: string;
    timestamp: number;
    user: string;
    userImage: string;
}


const Message: React.FC<any> = ({ message, timestamp, user, userImage }) => {
    return <div className='message'>
        <img src={userImage} alt=''/>
        <div className="message__info">
            <h4>{user} {new Date(timestamp?.seconds).toUTCString()}</h4>
            <p>{message}</p>
        </div>
    </div>;
}

export default Message 