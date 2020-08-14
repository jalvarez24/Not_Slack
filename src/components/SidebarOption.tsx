import React, { useState } from 'react'
import './SidebarOption.css'
import AddIcon from '@material-ui/icons/Add'
import { useHistory } from 'react-router-dom'
import db from '../firebase'

//icons
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import ArrowDownIcon from '@material-ui/icons/ArrowDropDown'
import Tooltip from '@material-ui/core/Tooltip'

interface Props {
    Icon?: any;
    title: string;
    folder?: boolean;
    toolTipText?: string;
    addChannelsOpt?: boolean;
    id?: string;
}

const SidebarOption: React.FC<Props> = ({ Icon, title, folder = false, toolTipText, addChannelsOpt = false, id}) => {

    const [tabOpen, setTabOpen] = useState(false)

    const updateFolderOpen = () => {
         setTabOpen(!tabOpen)
    }

    const addChannel = () => {
        let channelName = prompt('Please enter channel name')
        if(channelName) {
            db.collection('rooms').add({
                name: channelName,
            })
        }
    }

    const history = useHistory();

    const selectChannel = () => {
        if(id) {
            history.push(`/room/${id}`)
        }
        else {
            history.push(title)
        }
    }
    return <div 
    className={
        folder?
        'disableHover sidebarOption'
        :
        'sidebarOption'
    }
    onClick={folder? updateFolderOpen : addChannelsOpt? addChannel : selectChannel} 
    >
        {Icon && <Icon className='sidebarOption__icon' />}
        {Icon ? (
            <h3>{title}</h3>
        ) : 
        (
            <>
            {
            folder ?
                <>
                    {
                    tabOpen ?
                    <ArrowDownIcon className='sidebarOption__icon arrow__icon' /> 
                    :
                    <ArrowRightIcon className='sidebarOption__icon arrow__icon' /> 
                    }
                    <h3>{title}</h3>
                </>
                :
                <>
                    {
                    addChannelsOpt ?
                    <>
                    <AddIcon className='sidebarOption__addChannel' />
                    <span style={{fontSize: '14px'}}>{title}</span>
                    </>
                    :
                    <h3 className='sidebarOption__channel'>
                        <span className='sidebarOption__hash'>#</span> {title}
                    </h3>
                    }
                </>
            }
            </>
        )}
       {folder && 
       <Tooltip title={ <span style={{fontSize: '18px'}}>{toolTipText}</span> } 
       className='iconContainer' 
       arrow>
               <AddIcon className='addIcon__icon' onClick={(e) => {e.stopPropagation();addChannel();}} />
       </Tooltip>
       }
    </div>;
}

export default SidebarOption