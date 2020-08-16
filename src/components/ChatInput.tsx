import React, { useState, useEffect } from 'react'
import './ChatInput.css'
import { Button } from '@material-ui/core'
import db from '../firebase'
import firebase from 'firebase'
import { userInfo } from 'os'
import { useStateValue } from './StateProvider'

interface Props {
    channelName: string;
    channelId: string;
}


const ChatInput: React.FC<Props> = ({ channelName, channelId }) => {


    const [input, setInput] = useState('')
    const [{ user }] = useStateValue()

    const sendMessage = (e) => {
        e.preventDefault()

        db.collection('rooms').doc(channelId).onSnapshot(snapshot => {
            if(snapshot.exists) {
                if(channelId && input.trim() !== '') {
                    db.collection('rooms').doc(channelId).collection('messages').add({
                        message: input,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        user: user.displayName,
                        userImage: user.photoURL,
                    })
                }
            }
        })

        setInput('')
    }
    
    useEffect(() => {
        if(input.trim().length > 64)
            setInput(input.trim().substring(0, 64));
    }, [input])

    return <div className='chatInput'>
        <form>
            <input
            value={input}
            onChange={e => setInput(e.target.value)} 
            placeholder={`Send a message to #${channelName?.toLowerCase()}`} />
            <Button type='submit' onClick={sendMessage}>
                SEND
            </Button>
        </form>
        <div className='characterCount'>
            <span>Characters Remaining:{64 - input.trim().length}</span>
        </div>
        
    </div>;
}

export default ChatInput