import React from 'react'
import Modal from 'react-modal'
import { useStateValue } from './StateProvider'
import { Button } from '@material-ui/core'
import { auth } from '../firebase'

import './SignOutModal.css'

interface Props {
    isOpen: any;
    onRequestClose: any;
}

const SignOutModal: React.FC<Props> = ({ isOpen, onRequestClose }) => {

    const [{ user }] = useStateValue()

    const signOut = () => {
        auth.signOut().then(() => {
            console.log("SUCCESSFUL SIGN OUT")
        }).catch((e) => {
            console.error(e)
        })
    }
    console.log({user})
    return(<Modal
        isOpen={isOpen}
        onRequestClose={() =>{onRequestClose(false)}}
        className='signOutModal'
        style={{overlay: {backgroundColor: '#1a1a1a30'}}}
        onClick = {(e) => {console.log("Detected")}}
    >
        <div className='signOutModal__overlay' 
        onClick={(e) => {e.preventDefault(); e.stopPropagation();}}>
            <div className='signOutModal__container'>
                <div className='signOutModal__container__header'>
                    <h2>{user?.displayName}</h2>
                    <h3 onClick={() => onRequestClose(false)}>
                        <span>ESC</span> to close 
                    </h3>
                </div>
                <div className='userDetails'>
                    <h3>Data used by Slack Clone:</h3>
                    <div className='userTypeSection'>
                        <span style={{fontWeight: 'bold'}}>Google Display Name: </span>
                        {user?.displayName}
                    </div>
                    <div className='userTypeSection'>
                        <span style={{fontWeight: 'bold'}}>Google Photo:</span> 
                        <img src={user?.photoURL} alt={user?.displayName} style={{width: '60px', height: 'auto'}} />
                    </div>
                    <div className='userTypeSection'>
                        <span style={{fontWeight: 'bold', textDecoration: 'underline', fontSize: '14px'}}>Your email is never shown to other users or saved</span>
                    </div>
                    <div className='userTypeSection'>
                        <span style={{fontWeight: 'bold', textDecoration: 'underline', padding: '0 20px', fontSize: '14px'}}>Your display name and photo are only seen on messages you've posted</span>
                    </div>
                </div>
                <Button onClick={()=>signOut()} className='signOutButton'>Sign Out</Button>
            </div>
        </div>
    </Modal>)
}

export default SignOutModal