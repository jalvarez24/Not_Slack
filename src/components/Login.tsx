import React from 'react'
import './Login.css'
import { auth, provider } from '../firebase';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';
//ui
import { Button } from '@material-ui/core'
import Logo512 from '../logos/logo512.png'

interface Props {
}


const Login: React.FC = () => {

    const [{ user }, dispatch] = useStateValue()

    const signIn = () => {
        auth.signInWithPopup(provider)
        .then((result) => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user
            })
        })
        .catch((error) => {
            alert(error.message)
        })
    }

    return <div className='login'>
        <div className="login__container">
            <img
                src={Logo512}
                alt=''
            />
            <h1>Sign in to Not Slack</h1>
            <p>(definitely a clone)</p>
            <Button onClick={signIn} >Sign in with Google</Button>
        </div>
    </div>;
}

export default Login 