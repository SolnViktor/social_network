import React from 'react';
import styles from './Messages.module.css'


type ChatItemType = {
    mess: string
}

const ChatItem = (props: ChatItemType) => {

    let newMessage:any = React.createRef();

    let newMessageHandler = () => {
        let text = newMessage.current.value;
        alert(text);
    }

    return (

        <div className={styles.chat__item}>
            <div className={styles.area}>
            <textarea ref={newMessage} className={styles.text} name="" id="" cols={30} rows={3}></textarea>
            <button onClick={newMessageHandler} className={styles.text__button}>Add message</button>
            </div>



            <div className={styles.chat}>{props.mess}</div>

        </div>
    )
}


export default ChatItem;