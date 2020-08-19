import React, { useState, useEffect } from 'react'
import './Sidebar.css'
import SidebarOption from './SidebarOption'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import Tooltip from '@material-ui/core/Tooltip'
import db from '../firebase'
import { useStateValue } from './StateProvider'
import SignOutModal from './SignOutModal'

//icons
import CreateIcon from '@material-ui/icons/Create'
import InsertCommentIcon from '@material-ui/icons/InsertComment'
import InboxIcon from '@material-ui/icons/Inbox'
import DraftsIcon from '@material-ui/icons/Drafts'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import AppsIcon from '@material-ui/icons/Apps'

interface Props {
}

interface RoomProps {
    id: string;
    name: string;
}

const Sidebar: React.FC = () => {

    const [channels, setChannels]= useState<RoomProps[] | null>(null)
    const [{user}] = useStateValue()

    const [channelsOpen, setChannelsOpen] = useState(true)
    const [directMessagesOpen, setDirectMessagesOpen] = useState(true)

    const [signOutModalOn, setSignOutModalOn] = useState(false)

    useEffect(() => {
        db.collection('rooms').onSnapshot(snapshot => ((
            setChannels(
                snapshot.docs.map((doc) =>({
                    id: doc.id,
                    name: doc.data().name,
                }))
            )
        )))
    }, [])


    return <div className='sidebar'>
        <div className='sidebar__header' onClick={()=>setSignOutModalOn(true)}>
            <div className="sidebar__info">
                <h2>{user?.displayName}</h2>
                <h3>
                    <FiberManualRecordIcon />
                    {user?.email}
                </h3>
            </div>
            <Tooltip title={<span style={{fontSize: '18px'}}>New message</span>} className='iconContainer' arrow onClick={(e)=>e.stopPropagation()}>
                <CreateIcon />
            </Tooltip>
        </div>
        <SidebarOption Icon={InsertCommentIcon} title='All unreads' />
        <SidebarOption Icon={InboxIcon} title='All DMs' />
        <SidebarOption Icon={DraftsIcon} title='Drafts' />
        <SidebarOption Icon={BookmarkBorderIcon} title='Saved items' />
        <SidebarOption Icon={PeopleAltIcon} title='People & user groups' />
        <SidebarOption Icon={AppsIcon} title='Apps' />
        <hr />
        <SidebarOption title='Channels' toolTipText='Add channels' folder folderOpen={channelsOpen} setFolderOpen={setChannelsOpen}/>

        <div className='channels__container'>
        {channelsOpen && channels?.map((channel, index) => {
            return <SidebarOption title={channel.name} key={index} id={channel.id} />         
        })
        }
        <SidebarOption title='Add Channels' addChannelsOpt /> 
        </div>
        <hr />
        <SidebarOption title='Direct Messages' toolTipText='Open a direct message' folder folderOpen={directMessagesOpen} setFolderOpen={setDirectMessagesOpen} />
        { signOutModalOn &&
            <SignOutModal isOpen={signOutModalOn} onRequestClose={setSignOutModalOn}/>
        }
    </div>;
}

export default Sidebar
  