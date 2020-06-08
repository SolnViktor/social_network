import React from 'react';
import styles from './Dialogs.module.css';
import ChatItem from "./Messages/Messages";
import Dialog from "./DialogsItem/DialogsItem";
import {MessagesPageType} from "../../redux/store";
import TextArea from "./TextArea/TextArea";
import { Redirect } from 'react-router-dom';



type DataStateType = {
    dialogsPage: MessagesPageType
    addMessage: (newDialogMessage: string) => void
    isAuth: boolean
    resetForm: () => void
}


const Dialogs = (props: DataStateType) => {

    type dType = {
        id:string
        name:string
    }
    type mType = {
        id:string
        messages: string
    }


    let JSXDialogsNames = props.dialogsPage.dialogs.map( (d: dType) => (<Dialog key={d.id} name={d.name} id={d.id}/>))

    let JSXChatMessages = props.dialogsPage.messages.map( (m: mType) => (<ChatItem key={m.id} mess={m.messages}/>))
    if (!props.isAuth) return <Redirect to={'/login'}/>;

    return (
        <div>
            <div className={styles.title}> Dialogs </div>
            <div className={styles.dialogs__container}>
                <div className={styles.dialogsNames}>
                    {JSXDialogsNames}
                </div>

                <div className={styles.dialogs__content}>

                    <TextArea
                        addMessage={props.addMessage}
                        resetForm={props.resetForm}
                    />

                    <div className={styles.chat}>
                        {JSXChatMessages}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Dialogs;