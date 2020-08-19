import React, { useState, useEffect } from 'react'
import './SidebarOption.css'
import AddIcon from '@material-ui/icons/Add'
import { useHistory } from 'react-router-dom'
import db from '../firebase'
import Modal from 'react-modal'

//icons
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import ArrowDownIcon from '@material-ui/icons/ArrowDropDown'
import Tooltip from '@material-ui/core/Tooltip'
import { Button } from '@material-ui/core'

interface Props {
    Icon?: any;
    title: string;
    folder?: boolean;
    toolTipText?: string;
    addChannelsOpt?: boolean;
    id?: string;
    folderOpen?: boolean;
    setFolderOpen?: any;
}

const SidebarOption: React.FC<Props> = ({ Icon = null, title, folder = false, toolTipText, addChannelsOpt = false, id, folderOpen, setFolderOpen}) => {

    const updateFolderOpen = () => {
        setFolderOpen(!folderOpen)
    }

    const [addChannelModalOpen, setAddChannelModalOpen] = useState(false)

    const [createChannelInput, setCreateChannelInput] = useState('')

    useEffect(() => {
        if(createChannelInput.trim().length >20) setCreateChannelInput(createChannelInput.trim().substring(0, 20)) 
    }, [createChannelInput])

    const addChannel = () => {
        setAddChannelModalOpen(true)
        // if(toolTipText === 'Add channels' || addChannelsOpt) {
        //     let channelName = prompt('Please enter channel name')
        //     if(channelName && channelName?.trim().length > 0) {
        //         db.collection('rooms').add({
        //             name: channelName,
        //         })
        //     }
        // }
    }

    const createChannel = () => {
        if(createChannelInput.trim().length > 0)
            if(createChannelInput[0] == '#') setCreateChannelInput(createChannelInput.substr(1, createChannelInput.length))
            else {
                db.collection('rooms').add({
                    name: createChannelInput,
                })
                setAddChannelModalOpen(false)
                //Redirect to the new room
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

    onClick={folder? updateFolderOpen : addChannelsOpt? addChannel : Icon ? undefined : selectChannel} 
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
                    folderOpen ?
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
               <AddIcon className='addIcon__icon' onClick={title !== 'Direct Messages' ? (e) => {addChannel();e.stopPropagation();} : (e) => e.stopPropagation()} />
       </Tooltip>
       }
       <Modal
          isOpen={addChannelModalOpen}
          onRequestClose={() =>{setAddChannelModalOpen(false)}}
          className='modal'
          style={{overlay: {backgroundColor: '#1a1a1a30'}}}
        //   shouldCloseOnOverlayClick={false}
        //   onClick = {(e) => {(e.preventDefault(); e.stopPropagation();)}}
          onClick = {(e) => {console.log("Detected")}}
        >
            <div className='ownOverlay' 
            onClick={(e) => {e.preventDefault(); e.stopPropagation();}}>
                <div className='modal__container'>
                    <div className='modal__container__header'>
                        <h2>Create a channel</h2>
                        <h3 onClick={() => setAddChannelModalOpen(false)}>
                            <span>ESC</span> to close 
                        </h3>
                    </div>
                    <p>Channels are where your team communications. They're best when organized around a topic - #marketing, for example.</p>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <input type="text" value={createChannelInput} onChange={(e) => setCreateChannelInput(e.target.value)} placeholder='# e.g. plan-budget' autoFocus
                        onKeyPress={(e) => {e.keyCode == 13 && e.preventDefault()}}
                        
                        />
                        <Button onClick={createChannel}>Create</Button>
                    </form>
                </div>
            </div>
        </Modal>
    </div>;
}

export default SidebarOption