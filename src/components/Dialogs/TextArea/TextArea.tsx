import React, {ChangeEvent, KeyboardEvent} from 'react';
import styles from './TextArea.module.css'


type DispatchType = {
    newMessageText: string
    updateNewMessage: (newMessage: string) => void
    addMessage: () => void
}

function TextArea(props: DispatchType) {

    function addMessage() {
        props.addMessage();
    }

    function onKeyPressHandler(e: KeyboardEvent<HTMLTextAreaElement>) {
        if (e.charCode === 13) {
            addMessage()
        }
    }

    function onMessageChange(e: ChangeEvent<HTMLTextAreaElement>) {
        let newMessage = e.target.value;
        props.updateNewMessage(newMessage);
    }


    return (
        <div className={styles.content}>

                <textarea
                    className={styles.area}
                    onChange={onMessageChange}
                    onKeyPress={onKeyPressHandler}
                    value={props.newMessageText}
                    placeholder="Your message"
                    name="" id=""
                    cols={110}
                    rows={5}
                />

            <button
                onClick={addMessage}
                className={styles.button}
            >
                Add message
            </button>
        </div>
    )
}


export default TextArea;