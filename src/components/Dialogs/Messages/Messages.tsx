import React from 'react';
import styles from './Messages.module.css'


type ChatItemType = {
    mess: string
}

const ChatItem = (props: ChatItemType) => {
    return (
        <div className={styles.chat}>
            <div className={styles.chat__item}>
                {props.mess}
            </div>
        </div>
    )
}


export default ChatItem;