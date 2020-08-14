import React from 'react'
import './Sidebar.css'
import SidebarOption from './SidebarOption'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import Tooltip from '@material-ui/core/Tooltip'

//icons
import CreateIcon from '@material-ui/icons/Create'
import InsertCommentIcon from '@material-ui/icons/InsertComment'
import InboxIcon from '@material-ui/icons/Inbox'
import DraftsIcon from '@material-ui/icons/Drafts'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import AppsIcon from '@material-ui/icons/Apps'
import FileCopyIcon from '@material-ui/icons/FileCopy'

interface Props {
}

const Sidebar: React.FC = () => {
    return <div className='sidebar'>
        <div className='sidebar__header'>
            <div className="sidebar__info">
                <h2>Jayro Alvarez</h2>
                <h3>
                    <FiberManualRecordIcon />
                    Jayro
                </h3>
            </div>
            <Tooltip title={<span style={{fontSize: '18px'}}>New message</span>} className='iconContainer' arrow>
                <CreateIcon />
            </Tooltip>
        </div>
        <SidebarOption Icon={InsertCommentIcon} title='Add channel' />
        <SidebarOption Icon={InboxIcon} title='Add channel' />
        <SidebarOption Icon={DraftsIcon} title='Add channel' />
        <SidebarOption Icon={BookmarkBorderIcon} title='Add channel' />
        <SidebarOption Icon={PeopleAltIcon} title='Add channel' />
        <SidebarOption Icon={AppsIcon} title='Add channel' />
        <hr />
        <SidebarOption title='Channels' toolTipText='Add channels' folder />
        <hr />
        <SidebarOption title='Direct Messages' toolTipText='Open a direct message' folder />
    </div>;
}

export default Sidebar
  