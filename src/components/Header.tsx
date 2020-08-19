import React, { useState } from 'react'
import './Header.css'
import { useStateValue } from './StateProvider'
import { auth } from '../firebase'
import SignOutModal from './SignOutModal'

//ui
import { Avatar } from '@material-ui/core'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import SearchIcon from '@material-ui/icons/Search'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import Tooltip from '@material-ui/core/Tooltip'

interface Props {
}

const Header: React.FC = () => {

    //state for signOutModal
    const [signOutModalOn, setSignOutModalOn] = useState(false)

    const [{ user }] = useStateValue()

    return <div className='header'>
        <div className='header__left'>
            <Tooltip title={<span style={{fontSize: '18px'}}>History</span>} className='iconContainer' arrow>
                <AccessTimeIcon />
            </Tooltip>
        </div>
        <div className='header__middle'>
            <SearchIcon />
            <input placeholder={user?.displayName}></input>
        </div>
        <div className="header__right">
            <Tooltip title={<span style={{fontSize: '18px'}}>Help</span>} className='iconContainer' arrow>
                <HelpOutlineIcon />
            </Tooltip>
            <div className='avatar__container' onClick={()=>setSignOutModalOn(true)}>
                <Avatar
                    className='MuiAvatar-rounded head__avatar'
                    alt={user?.displayName}
                    src={user?.photoURL}
                />
                <div className='avatar__status'>
                </div>
            </div>
        </div>
        { signOutModalOn &&
            <SignOutModal isOpen={signOutModalOn} onRequestClose={setSignOutModalOn}/>
        }
    </div>;
  }
  
  export default Header
  