import React from 'react';
import styles from './Dialogs.module.css';
import ChatItem from "./Messages/Messages";
import Dialog from "./DialogsItem/DialogsItem";
import {MessagesPageType} from "../../redux/state";


type DataStateType = {
    dataState: MessagesPageType
}


const Dialogs = (props: DataStateType) => {

    let JSXDialogs = props.dataState.dialogs.map( d =>  ( <Dialog name={d.name} id={d.id}  /> ) )

    let JSXDialog = props.dataState.messages.map ( m => ( <ChatItem mess={m.messages} /> )  )

    return (
        <div>
            <div className={styles.title}>Dialogs</div>
            <div className={styles.dialogs__container}>
                <div className={styles.dialogs}>
                    {JSXDialogs}
                </div>


                <div className={styles.chat}>
                    {JSXDialog}
                </div>
            </div>

        </div>
    )
}

export default Dialogs;