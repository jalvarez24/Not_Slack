import React from 'react'
import './Home.css'
import SidebarOption from './SidebarOption'
import db from '../firebase'
import Logo512 from '../logos/logo512.png'

interface Props {
}

const Home: React.FC = () => {


    return <div className='home'>
        <div className="chat__header">
            <div className="chat__headerLeft">
                <h4 className="chat__channelName">
                    <strong><h1>#not-slack home</h1></strong>
                </h4>
            </div>
            <div className="chat__headerRight">
            </div>
        </div>
        <div className="home__body">
            <div>Welcome to</div>
            <div className='logoAndName'>
                <img src={Logo512} alt='' />
                <div>Not-Slack</div>
            </div>
            <ul>
                Slack clone implemented with:
                <li><span>Front-End:</span> React and TypeScript</li>
                <li>-<span>Back-End:</span> Firebase</li>
            </ul>
        </div>
    </div>;
}

export default Home
  