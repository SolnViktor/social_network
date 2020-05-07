import React from 'react';
import s from './Dialogs.module.css';
import {NavLink} from 'react-router-dom';



type DialogItemType = {
    name: string
    id: number
}

const DialogItem = (props: DialogItemType) => {
    let path = '/dialogs/' + props.id;
    return (
        <div className={s.dialogs__item + ' ' + s.active}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}


type ChatItemType = {
    mess: string
}

const ChatItem = (props: ChatItemType) => {
    return (
        <div className={s.chat__item}>{props.mess}</div>
    )
}



const Dialogs = () => {
    return (
        <div>
            <div className={s.title}>Dialogs</div>
            <div className={s.dialogs__container}>
                <div className={s.dialogs}>
                    <DialogItem name='Viktor' id={1}/>
                    <DialogItem name='Nikita' id={2}/>
                    <DialogItem name='Vasil' id={3}/>
                    <DialogItem name='Semen' id={4}/>
                    <DialogItem name='Timofey' id={5}/>
                    <DialogItem name='Andrew' id={6}/>

                </div>


                <div className={s.chat}>
                    <ChatItem mess='Hi'/>
                    <ChatItem mess='How id your it-kamasutra?'/>
                    <ChatItem mess='Yo'/>
                    <ChatItem mess='Yo'/>
                    <ChatItem mess='Yo'/>
                </div>
            </div>

        </div>
    )
}

export default Dialogs;