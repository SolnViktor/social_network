import React from 'react';
import styles from './TextArea.module.css';
import {Field, reduxForm} from 'redux-form'
import {Textarea} from "../../Common/FormsControls/FormsControl";
import {maxLengthCreator, required} from "../../../utils/validators/validators";


type DispatchType = {
    addMessage: (newDialogMessage: string) => void
    resetForm: () => void
}

function TextArea(props: DispatchType) {


    const addMessageBody = (value: any) => {
        console.log(value.dialog)
        props.addMessage(value.dialog)
        props.resetForm();
    }



    return (
        <div className={styles.content}>
            <DialogsReduxForm onSubmit={addMessageBody}/>
        </div>
    )
}
const maxLength10 = maxLengthCreator(50);

const DialogsForm = (props: any) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <Field
                name={"dialog"}
                component={Textarea}
                validate={[required, maxLength10]}
                placeholder="Your message"/>
            <button className={styles.button}>
                Add message
            </button>
        </form>
    )
}

const DialogsReduxForm = reduxForm({form:'dialog'})(DialogsForm);


export default TextArea;