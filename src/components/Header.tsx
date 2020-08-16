import React, { Component } from 'react'
import './Header.css'
import { useStateValue } from './StateProvider';

//ui
import { Avatar } from '@material-ui/core'
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Tooltip from '@material-ui/core/Tooltip';

interface Props {
}

const Header: React.FC = () => {
    const [{ user }] = useStateValue()
    return <div className='header'>
        <div className='header__left'>
            <Tooltip title={<span style={{fontSize: '18px'}}>History</span>} className='iconContainer' arrow>
                <AccessTimeIcon />
            </Tooltip>
        </div>
        <div className='header__middle'>
            <SearchIcon />
            <input placeholder='Search Awesome Team'></input>
        </div>
        <div className="header__right">
            <Tooltip title={<span style={{fontSize: '18px'}}>Help</span>} className='iconContainer' arrow>
                <HelpOutlineIcon />
            </Tooltip>
            <div className='avatar__container'>
                <Avatar
                    className='MuiAvatar-rounded head__avatar'
                    alt={user?.displayName}
                    src={user?.photoURL}
                />
                <div className='avatar__status'>

                </div>
            </div>
        </div>
    </div>;
  }
  
  export default Header;
  
