import React, { Component } from 'react'
import './Header.css'
import { Avatar } from '@material-ui/core'
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

interface Props {
    text: string;
}

const Header: React.FC<Props> = ({ text }) => {
    return <div className='header'>
        <div className='header__left'>
            <Avatar
                className='head__avatar'
                alt='Jayro Alvarez'
                src=''
            />
            <AccessTimeIcon />
        </div>
        <div className='header__middle'>
            <SearchIcon />
            <input placeholder='Search Awesome Team' ></input>
        </div>
        <div className="header__right">
            <HelpOutlineIcon />
        </div>
    </div>;
  }
  
  export default Header;
  
